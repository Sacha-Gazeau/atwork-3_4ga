// scripts/test-smtp.ts
// Usage: tsx scripts/test-smtp.ts
// This script attempts to connect/verify the SMTP server using env variables.

import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

// Load .env file manually
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, "");
      process.env[key] = value;
    }
  });
}

const {
  CONTACT_SMTP_HOST,
  CONTACT_SMTP_PORT,
  CONTACT_SMTP_USER,
  CONTACT_SMTP_PASS,
} = process.env;

if (!CONTACT_SMTP_HOST || !CONTACT_SMTP_PORT) {
  console.error("Missing CONTACT_SMTP_HOST or CONTACT_SMTP_PORT in env.");
  process.exit(1);
}

const port = Number(CONTACT_SMTP_PORT) || 465;

async function run() {
  console.log("Testing SMTP connection to", CONTACT_SMTP_HOST + ":" + port);

  try {
    const transporter = nodemailer.createTransport({
      host: CONTACT_SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth:
        CONTACT_SMTP_USER && CONTACT_SMTP_PASS
          ? { user: CONTACT_SMTP_USER, pass: CONTACT_SMTP_PASS }
          : undefined,
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
      logger: true,
      debug: true,
    });

    await transporter.verify();
    console.log("SMTP verify: OK — server accepted connection.");
  } catch (err: unknown) {
    console.error("SMTP verify failed:");

    let code: string | number | undefined;
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    if (typeof err === "object" && err !== null) {
      const e = err as {
        code?: string | number;
        response?: unknown;
        stack?: string;
      };
      code = e.code;
      if (e.response) console.error("response:", e.response);
      if (e.stack) console.error(e.stack);
    }

    if (code) console.error(`code: ${code}`);
    console.error("message:", message);

    process.exitCode = 2;
  }
}

run();
