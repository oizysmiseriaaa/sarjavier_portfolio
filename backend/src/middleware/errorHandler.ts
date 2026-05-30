import type { ErrorRequestHandler } from "express";
import type { ApiResponse, AppError } from "../types";

export const errorHandler: ErrorRequestHandler<Record<string, never>, ApiResponse> = (
  error: AppError,
  _request,
  response,
  _next
) => {
  void _next;

  const possibleStatus = error.statusCode ?? error.status;
  const statusCode = possibleStatus && possibleStatus >= 400 ? possibleStatus : 500;
  const isJsonSyntaxError = error instanceof SyntaxError && error.type === "entity.parse.failed";

  console.error("[error]", {
    message: error.message,
    stack: error.stack,
    statusCode,
  });

  response.status(statusCode).json({
    success: false,
    message: isJsonSyntaxError
      ? "Malformed JSON request body."
      : statusCode === 500
        ? "Internal server error"
        : error.message,
  });
};
