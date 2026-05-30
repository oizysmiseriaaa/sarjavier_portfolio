import type { ContactFormData } from "../types";

const emailRegex = /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

type ValidationResult =
  | { valid: true; data: ContactFormData }
  | { valid: false; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readTrimmedString(body: Record<string, unknown>, key: keyof ContactFormData): string | null {
  const value = body[key];

  if (typeof value !== "string") {
    return null;
  }

  return value.trim();
}

export function validateContactPayload(payload: unknown): ValidationResult {
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
