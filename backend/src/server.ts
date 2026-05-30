import cors from "cors";
import express from "express";
import helmet from "helmet";
import type { ApiResponse } from "./types";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";
import { validateEnv } from "./utils/envValidator";

async function bootstrap(): Promise<void> {
  validateEnv();

  const [{ testDatabaseConnection }, { verifyEmailConnection }, { apiRoutes }] = await Promise.all([
    import("./config/db"),
    import("./utils/emailService"),
    import("./routes/apiRoutes"),
  ]);

  const app = express();
  const port = Number(process.env.PORT ?? 5000);
  const clientUrl = process.env.CLIENT_URL as string;

  await testDatabaseConnection();
  await verifyEmailConnection();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || origin === clientUrl) {
          callback(null, true);
          return;
        }

        callback(new Error("CORS policy does not allow this origin."));
      },
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: false,
      optionsSuccessStatus: 204,
    })
  );
  app.use(express.json({ limit: "32kb" }));
  app.use(logger);
  app.use("/api", apiRoutes);
  app.use((_request, response) => {
    response.status(404).json({
      success: false,
      message: "Route not found.",
    } satisfies ApiResponse);
  });
  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`[server] Server running on port ${port}.`);
    console.info(`[server] Environment: ${process.env.NODE_ENV ?? "development"}.`);
    console.info("[server] Database connected.");
    console.info(`[server] Allowed client: ${clientUrl}.`);
  });
}

bootstrap().catch((error) => {
  console.error("[startup] Failed to start server.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
