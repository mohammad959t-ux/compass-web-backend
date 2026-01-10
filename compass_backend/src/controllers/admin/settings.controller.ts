import { type Request, type Response } from "express";

import { env } from "../../config/env.js";
import { SettingModel } from "../../models/index.js";

async function getSettings() {
  let settings = await SettingModel.findOne();
  if (!settings) {
    settings = await SettingModel.create({ minDepositPercent: env.MIN_DEPOSIT_PERCENT, featureFlags: {} });
  }
  return settings;
}

export async function fetchSettings(_req: Request, res: Response) {
  const settings = await getSettings();
  res.json(settings);
}

export async function updateSettings(req: Request, res: Response) {
  const settings = await getSettings();
  if (req.body.minDepositPercent !== undefined) {
    settings.minDepositPercent = Number(req.body.minDepositPercent);
  }
  if (req.body.featureFlags) {
    settings.featureFlags = req.body.featureFlags;
  }
  await settings.save();
  res.json(settings);
}
