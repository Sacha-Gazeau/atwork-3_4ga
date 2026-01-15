"use server";

import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { prisma } from "@/lib/client";
import { transporter } from "@/lib/mail";

const RequestSchema = z.object({
  serviceType: z.string(),
  gardenStyle: z.array(z.string()),
  deadline: z.string(),
  budget: z.string(),
  addons: z.array(z.string()),
  // Contact Info
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  // password removed
  number: z.string(),
  zipCode: z.string(),
  city: z.string(),
  fileUrls: z.array(z.string()).optional(),
});

export async function createRequest(data: z.infer<typeof RequestSchema>) {
  const result = RequestSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return { success: false, error: "Ongeldige invoer." };
  }

  const {
    serviceType,
    gardenStyle,
    deadline,
    budget,
    addons,
    firstName,
    lastName,
    email,
    // password,
    number,
    zipCode,
    city,
    fileUrls,
  } = result.data;

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Er bestaat al een account met dit e-mailadres.",
      };
    }

    // 2. Hash password
    // 2. Hash password (auto-generated since field is removed)
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // 3. Create User and Request in a transaction (or sequential, but transaction checks consistency)
    // Using explicit sequential for better control or nested create
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword: hashedPassword,
        phoneNumber: number,
        zipCode,
        city,
      },
    });

    // 4. Create Request linked to User
    const newRequest = await prisma.request.create({
      data: {
        serviceType,
        gardenStyle: gardenStyle.join(", "),
        deadline,
        budget,
        addons: addons.join(", "),
        userId: user.id,
        files: {
          create: fileUrls?.map((url) => ({
            url,
          })),
        },
      },
    });
    await transporter.sendMail({
      from: `"Garden Service" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: email,
      bcc: process.env.CONTACT_TO_EMAIL,
      subject: "Bevestiging van uw aanvraag",
      html: `
    <h2>Nieuwe aanvraag</h2>

    <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Telefoon:</strong> ${number}</p>

    <p><strong>Service:</strong> ${serviceType}</p>
    <p><strong>Stijl:</strong> ${gardenStyle.join(", ")}</p>
    <p><strong>Deadline:</strong> ${deadline}</p>
    <p><strong>Budget:</strong> ${budget}</p>
    <p><strong>Addons:</strong> ${addons.join(", ")}</p>

    <h3>Afbeeldingen</h3>
    <ul>
      ${fileUrls && fileUrls.length > 0
          ? fileUrls
            .map((url) => `<li><a href="${url}">${url}</a></li>`)
            .join("")
          : "<li>Aucune image</li>"
        }
    </ul>
  `,
    });
    return { success: true, requestId: newRequest.id };
  } catch (error) {
    console.error("Error creating request:", error);
    return {
      success: false,
      error: `Er is iets misgegaan: ${(error as Error).message}`,
    };
  }
}
