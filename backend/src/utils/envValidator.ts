import dotenv from "dotenv";

dotenv.config();

const defaultVariables = {
  PORT: "5000",
  NODE_ENV: "development",
  DB_HOST: "localhost",
  DB_PORT: "3306",
  DB_USER: "root",
  DB_PASSWORD: "",
  DB_NAME: "portfolio_db",
  EMAIL_HOST: "smtp.gmail.com",
  EMAIL_PORT: "587",
  CLIENT_URL: "http://localhost:3000",
} as const;

Object.entries(defaultVariables).forEach(([key, value]) => {
  process.env[key] ??= value;
});

const productionRequiredVariables = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASS",
  "EMAIL_TO",
  "CLIENT_URL",
] as const;

export type RequiredEnvKey = (typeof productionRequiredVariables)[number] | "PORT" | "NODE_ENV";

export function validateEnv(): void {
  const isProduction = process.env.NODE_ENV === "production";
  const requiredVariables = isProduction
    ? productionRequiredVariables
    : productionRequiredVariables.filter((key) => !key.startsWith("EMAIL_"));

  const missingVariables = requiredVariables.filter((key) => {
    if (key === "DB_PASSWORD" && !isProduction) {
      return false;
    }

    return !process.env[key]?.trim();
  });

  if (missingVariables.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVariables.join(", ")}`);
  }

  const dbPort = Number(process.env.DB_PORT);
  const emailPort = Number(process.env.EMAIL_PORT);
  const port = Number(process.env.PORT ?? 5000);

  if (!Number.isInteger(dbPort) || dbPort <= 0 || dbPort > 65535) {
    throw new Error("DB_PORT must be a valid positive integer.");
  }

  if (!Number.isInteger(emailPort) || emailPort <= 0 || emailPort > 65535) {
    throw new Error("EMAIL_PORT must be a valid positive integer.");
  }

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error("PORT must be a valid positive integer.");
  }

  const clientUrl = process.env.CLIENT_URL?.trim();
  if (clientUrl) {
    try {
      new URL(clientUrl);
    } catch {
      throw new Error("CLIENT_URL must be a valid URL.");
    }
  }
}

export function getEnv(key: RequiredEnvKey): string {
  if (key === "DB_PASSWORD") {
    return process.env.DB_PASSWORD ?? "";
  }

  const value = process.env[key]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}
