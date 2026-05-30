import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { ContactRecord } from "../types";
import { getEnv } from "./envValidator";

function isEmailConfigured(): boolean {
  return Boolean(process.env.EMAIL_USER?.trim() && process.env.EMAIL_PASS?.trim() && process.env.EMAIL_TO?.trim());
}

function createTransporter() {
  const emailPort = Number(getEnv("EMAIL_PORT"));

  return nodemailer.createTransport({
    host: getEnv("EMAIL_HOST"),
    port: emailPort,
    secure: emailPort === 465,
    auth: {
      user: getEnv("EMAIL_USER"),
      pass: getEnv("EMAIL_PASS"),
    },
  } satisfies SMTPTransport.Options);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildContactEmail(contact: ContactRecord): string {
  const submittedAt = new Date().toISOString();
  const rows = [
    ["Name", contact.name],
    ["Email", contact.email],
    ["Subject", contact.subject],
    ["Submission Time", submittedAt],
    ["IP Address", contact.ipAddress ?? "Unavailable"],
  ];

  const detailRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#111827;width:180px;">${escapeHtml(label)}</td>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;color:#374151;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="padding:24px;background:#111827;color:#ffffff;">
          <h1 style="margin:0;font-size:22px;line-height:1.3;">New Portfolio Contact Message</h1>
          <p style="margin:8px 0 0;color:#d1d5db;">A visitor submitted the SARJ portfolio contact form.</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">${detailRows}</table>
        <div style="padding:24px;">
          <h2 style="margin:0 0 12px;font-size:16px;color:#111827;">Message</h2>
          <div style="white-space:pre-wrap;line-height:1.7;color:#374151;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;">${escapeHtml(contact.message)}</div>
        </div>
      </div>
    </div>`;
}

export async function verifyEmailConnection(): Promise<void> {
  if (!isEmailConfigured()) {
    console.info("[email] SMTP credentials are not configured. Email notifications are disabled for this environment.");
    return;
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.info("[email] SMTP connection verified successfully.");
  } catch (error) {
    console.error("[email] SMTP verification failed. Contact submissions will still be saved to the database.");
    console.error(error instanceof Error ? error.message : error);
  }
}

export async function sendContactNotification(contact: ContactRecord): Promise<void> {
  if (!isEmailConfigured()) {
    console.info("[email] Notification skipped because SMTP credentials are not configured.");
    return;
  }

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"SARJ Portfolio" <${getEnv("EMAIL_USER")}>`,
      to: getEnv("EMAIL_TO"),
      replyTo: contact.email,
      subject: `Portfolio Contact: ${contact.subject}`,
      html: buildContactEmail(contact),
      text: [
        "New Portfolio Contact Message",
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        `Subject: ${contact.subject}`,
        `Submission Time: ${new Date().toISOString()}`,
        `IP Address: ${contact.ipAddress ?? "Unavailable"}`,
        "",
        contact.message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("[email] Failed to send contact notification.");
    console.error(error instanceof Error ? error.message : error);
  }
}
