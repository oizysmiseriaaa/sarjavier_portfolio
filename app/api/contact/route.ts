import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
};

type ValidationResult =
  | { valid: true; data: ContactPayload }
  | { valid: false; message: string };

const emailRegex =
  /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

const resend = new Resend(process.env.RESEND_API_KEY);
const BACKEND_CONTACT_TIMEOUT_MS = 10000;

function jsonResponse(body: ApiResponse, status: number) {
  return NextResponse.json(body, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readTrimmedString(body: Record<string, unknown>, key: keyof ContactPayload): string | null {
  const value = body[key];

  if (typeof value !== "string") {
    return null;
  }

  return value.trim();
}

function validateContactPayload(payload: unknown): ValidationResult {
  if (!isRecord(payload)) {
    return { valid: false, message: "Malformed request body." };
  }

  const name = readTrimmedString(payload, "name");
  const email = readTrimmedString(payload, "email");
  const subject = readTrimmedString(payload, "subject");
  const message = readTrimmedString(payload, "message");

  if (name === null || email === null || subject === null || message === null) {
    return { valid: false, message: "Name, email, subject, and message must be strings." };
  }

  if (!name || !email || !subject || !message) {
    return { valid: false, message: "Name, email, subject, and message are required." };
  }

  if (name.length > 100) {
    return { valid: false, message: "Name must be 100 characters or fewer." };
  }

  if (email.length > 255) {
    return { valid: false, message: "Email must be 255 characters or fewer." };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, message: "Email address is invalid." };
  }

  if (subject.length > 255) {
    return { valid: false, message: "Subject must be 255 characters or fewer." };
  }

  if (message.length > 5000) {
    return { valid: false, message: "Message must be 5000 characters or fewer." };
  }

  return {
    valid: true,
    data: {
      name,
      email,
      subject,
      message,
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildContactEmail(data: ContactPayload): string {
  const timestamp = new Date().toISOString();
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Subject", data.subject],
    ["Timestamp", timestamp],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="width:150px;padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#111827;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#374151;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="padding:24px;background:#111827;color:#ffffff;">
          <h1 style="margin:0;font-size:22px;line-height:1.3;">New Portfolio Contact</h1>
          <p style="margin:8px 0 0;color:#d1d5db;">A visitor submitted your portfolio contact form.</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
        <div style="padding:24px;">
          <h2 style="margin:0 0 12px;font-size:16px;color:#111827;">Message</h2>
          <div style="white-space:pre-wrap;line-height:1.7;color:#374151;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;">${escapeHtml(
            data.message
          )}</div>
        </div>
      </div>
    </div>`;
}

function getBackendContactUrl(): string | null {
  const baseUrl = process.env.BACKEND_CONTACT_API_URL?.trim();

  if (!baseUrl) {
    return null;
  }

  return new URL("/api/contact", baseUrl).toString();
}

async function postToBackend(data: ContactPayload) {
  const backendContactUrl = getBackendContactUrl();

  if (!backendContactUrl) {
    return null;
  }

  const response = await fetch(backendContactUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(BACKEND_CONTACT_TIMEOUT_MS),
  });
  const payload = (await response.json().catch(() => null)) as Partial<ApiResponse> | null;

  return jsonResponse(
    {
      success: Boolean(payload?.success && response.ok),
      message:
        typeof payload?.message === "string"
          ? payload.message
          : response.ok
            ? "Message sent successfully."
            : "Failed to send message.",
    },
    response.status
  );
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return jsonResponse({ success: false, message: "Malformed JSON request body." }, 400);
    }

    const validation = validateContactPayload(body);

    if (!validation.valid) {
      return jsonResponse({ success: false, message: validation.message }, 400);
    }

    const { data } = validation;
    const backendResponse = await postToBackend(data);

    if (backendResponse) {
      return backendResponse;
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      console.error("[contact] Missing RESEND_API_KEY or CONTACT_EMAIL.");
      return jsonResponse({ success: false, message: "Failed to send message." }, 500);
    }

    const from = process.env.RESEND_FROM_EMAIL ?? "SARJ Portfolio <onboarding@resend.dev>";

    const result = await resend.emails.send({
      from,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `New Portfolio Contact: ${data.subject}`,
      html: buildContactEmail(data),
      text: [
        "New Portfolio Contact",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject}`,
        `Timestamp: ${new Date().toISOString()}`,
        "",
        data.message,
      ].join("\n"),
    });

    if (result.error) {
      console.error("[contact] Resend failed:", result.error);
      return jsonResponse({ success: false, message: "Failed to send message." }, 500);
    }

    return jsonResponse({ success: true, message: "Message sent successfully." }, 200);
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return jsonResponse({ success: false, message: "Failed to send message." }, 500);
  }
}
