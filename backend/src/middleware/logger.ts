import type { NextFunction, Request, Response } from "express";

export function logger(request: Request, response: Response, next: NextFunction): void {
  const startedAt = process.hrtime.bigint();

  response.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    const timestamp = new Date().toISOString();
    const ipAddress = request.ip || request.socket.remoteAddress || "unknown";

    console.info(
      `[request] ${timestamp} ${request.method} ${request.originalUrl} ${response.statusCode} ${durationMs.toFixed(2)}ms ip=${ipAddress}`
    );
  });

  next();
}
