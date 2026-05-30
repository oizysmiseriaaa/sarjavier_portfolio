import type { NextFunction, Response } from "express";
import { createContact } from "../models/contactModel";
import type { ApiResponse, ContactRecord, ContactRequest } from "../types";
import { sendContactNotification } from "../utils/emailService";
import { validateContactPayload } from "../utils/validators";

function getClientIp(request: ContactRequest): string | null {
  const forwardedFor = request.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return request.ip || request.socket.remoteAddress || null;
}

export async function submitContact(
  request: ContactRequest,
  response: Response<ApiResponse>,
  next: NextFunction
): Promise<void> {
  try {
    const validation = validateContactPayload(request.body);

    if (!validation.valid) {
      response.status(400).json({
        success: false,
        message: validation.message,
      });
      return;
    }

    const contact: ContactRecord = {
      ...validation.data,
      ipAddress: getClientIp(request),
    };

    await createContact(contact);
    await sendContactNotification(contact);

    response.status(201).json({
      success: true,
      message: "Contact form submitted successfully.",
    });
  } catch (error) {
    next(error);
  }
}
