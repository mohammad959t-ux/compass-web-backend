import { env } from "./env.js";

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://compassdigitalservices.com",
  "https://admin.compassdigitalservices.com"
];

export function getCorsOrigins() {
  if (!env.CORS_ORIGINS) return defaultOrigins;
  const parsed = env.CORS_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : defaultOrigins;
}
