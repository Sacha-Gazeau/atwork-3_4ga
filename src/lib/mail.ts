import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.CONTACT_SMTP_HOST,
  port: Number(process.env.CONTACT_SMTP_PORT),
  secure: Number(process.env.CONTACT_SMTP_PORT) === 465,
  auth: {
    user: process.env.CONTACT_SMTP_USER,
    pass: process.env.CONTACT_SMTP_PASS,
  },
});
