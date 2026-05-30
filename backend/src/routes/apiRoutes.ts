import { Router } from "express";
import { submitContact } from "../controllers/contactController";
import { contactRateLimiter } from "../middleware/rateLimiter";

export const apiRoutes = Router();

apiRoutes.get("/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

apiRoutes.post("/contact", contactRateLimiter, submitContact);
