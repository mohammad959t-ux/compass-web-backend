import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";

describe("Health Endpoint", () => {
  const app = createApp();

  it("should return 200 and status ok", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
