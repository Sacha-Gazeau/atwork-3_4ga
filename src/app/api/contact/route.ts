import nodemailer from "nodemailer";

function jsonResponse(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { firstName, lastName, email, text } = body || {};

    if (!firstName || !lastName || !email || !text) {
      return jsonResponse(
        { success: false, error: "All fields are required." },
        400
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return jsonResponse(
        { success: false, error: "Invalid email address." },
        400
      );
    }

    const {
      CONTACT_SMTP_HOST,
      CONTACT_SMTP_PORT,
      CONTACT_SMTP_USER,
      CONTACT_SMTP_PASS,
      CONTACT_FROM_EMAIL,
      CONTACT_TO_EMAIL,
    } = process.env;

    if (
      !CONTACT_SMTP_HOST ||
      !CONTACT_SMTP_PORT ||
      !CONTACT_SMTP_USER ||
      !CONTACT_SMTP_PASS ||
      !CONTACT_FROM_EMAIL ||
      !CONTACT_TO_EMAIL
    ) {
      return jsonResponse(
        { success: false, error: "SMTP configuration is incomplete." },
        500
      );
    }

    const port = Number(CONTACT_SMTP_PORT) || 465;

    const transporter = nodemailer.createTransport({
      host: CONTACT_SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: {
        user: CONTACT_SMTP_USER,
        pass: CONTACT_SMTP_PASS,
      },
      // Timeouts to avoid long hangs and help surface ETIMEDOUT quickly
      connectionTimeout: 15000, // ms
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });

    // verify connection configuration early to fail fast on network issues
    await transporter.verify();

    const subject = `Contact form: ${firstName} ${lastName}`;
    const textBody = `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${text}`;
    const htmlBody = `<p><strong>Name:</strong> ${firstName} ${lastName}</p><p><strong>Email:</strong> ${email}</p><div>${text.replace(
      /\n/g,
      "<br />"
    )}</div>`;

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject,
      text: textBody,
      html: htmlBody,
      replyTo: email,
    });

    return jsonResponse({ success: true }, 200);
  } catch (err: any) {
    console.error("/api/contact error:", err);
    const code = err?.code || err?.errno || null;
    const message = err?.message || "Server error";
    return jsonResponse({ success: false, error: message, code }, 500);
  }
}

export const runtime = "nodejs";
