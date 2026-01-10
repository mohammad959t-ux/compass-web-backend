import mongoose from "mongoose";

import { env } from "../config/env.js";

let connected = false;

export async function connectMongo() {
  if (connected) return;
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGO_URI);
  connected = true;
  console.log("MongoDB connected");
}
