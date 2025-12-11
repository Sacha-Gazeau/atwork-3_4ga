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
    await transporter.verify();
    console.log("SMTP verify: OK — server accepted connection.");
  } catch (err: any) {
    console.error("SMTP verify failed:");
    console.error(err && err.code ? `code: ${err.code}` : "no code");
    console.error(err && err.message ? `message: ${err.message}` : String(err));
    if (err && err.response) console.error("response:", err.response);
    if (err && err.stack) console.error(err.stack);
    process.exitCode = 2;
  })
}

run();
