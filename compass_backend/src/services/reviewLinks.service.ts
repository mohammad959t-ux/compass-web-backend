import crypto from "crypto";

import { ReviewTokenModel } from "../models/index.js";

const DEFAULT_EXPIRY_DAYS = 14;

export async function createReviewToken(orderId?: string) {
  const token = `rv-${crypto.randomBytes(4).toString("hex")}`;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + DEFAULT_EXPIRY_DAYS);

  const record = await ReviewTokenModel.create({
    token,
    orderId: orderId ?? undefined,
    expiresAt,
    used: false
  });

  return record;
}

export async function validateReviewToken(token: string) {
  const record = await ReviewTokenModel.findOne({ token });
  if (!record) return { valid: false, reason: "not_found" } as const;
  if (record.used) return { valid: false, reason: "used" } as const;
  if (record.expiresAt.getTime() < Date.now()) return { valid: false, reason: "expired" } as const;
  return { valid: true, record } as const;
}

export async function markReviewTokenUsed(token: string) {
  const record = await ReviewTokenModel.findOne({ token });
  if (!record) return null;
  record.used = true;
  record.usedAt = new Date();
  await record.save();
  return record;
}
