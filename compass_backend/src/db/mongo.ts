import mongoose from "mongoose";

import { env } from "../config/env.js";

let connected = false;

export async function connectMongo() {
  if (connected) return;
  if (!env.MONGO_URI) {
    throw new Error("MONGO_URI is required");
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGO_URI);
  connected = true;
  console.log("MongoDB connected");
}
