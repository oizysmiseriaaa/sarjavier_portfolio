import type { Request } from "express";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface ContactRecord extends ContactFormData {
  ipAddress: string | null;
}

export interface AppError extends Error {
  statusCode?: number;
  status?: number;
  isOperational?: boolean;
  type?: string;
}

export type ContactRequest = Request<Record<string, never>, ApiResponse, unknown>;
