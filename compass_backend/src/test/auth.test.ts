import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import bcrypt from "bcryptjs";
import { createApp } from "../app.js";
import { UserModel } from "../models/index.js";
import { seedUsers } from "../seed/seed.js";

describe("Auth Endpoints", () => {
  const app = createApp();

  beforeEach(async () => {
    // Seed test users before each test
    await seedUsers();
  });

  describe("POST /auth/login", () => {
    it("should login successfully with valid credentials", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: process.env.ADMIN_EMAIL || "admin@compass.test",
          password: process.env.ADMIN_PASSWORD || "admin123"
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("role");
      expect(response.body.role).toBe("admin");
      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("should return 401 with invalid email", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "nonexistent@compass.test",
          password: "password123"
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });

    it("should return 401 with invalid password", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: process.env.ADMIN_EMAIL || "admin@compass.test",
          password: "wrongpassword"
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });

    it("should return 400 with missing email", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          password: "password123"
        });

      expect(response.status).toBe(400);
    });

    it("should return 400 with missing password", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "admin@compass.test"
        });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /auth/me", () => {
    it("should return user info when authenticated", async () => {
      // First login to get cookie
      const loginResponse = await request(app)
        .post("/auth/login")
        .send({
          email: process.env.ADMIN_EMAIL || "admin@compass.test",
          password: process.env.ADMIN_PASSWORD || "admin123"
        });

      const cookies = loginResponse.headers["set-cookie"];
      expect(cookies).toBeDefined();

      // Use the cookie to access /auth/me
      const meResponse = await request(app)
        .get("/auth/me")
        .set("Cookie", cookies || []);

      expect(meResponse.status).toBe(200);
      expect(meResponse.body).toHaveProperty("id");
      expect(meResponse.body).toHaveProperty("name");
      expect(meResponse.body).toHaveProperty("email");
      expect(meResponse.body).toHaveProperty("role");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app).get("/auth/me");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });
  });

  describe("POST /auth/logout", () => {
    it("should logout successfully and clear cookie", async () => {
      const response = await request(app).post("/auth/logout");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ok: true });
      expect(response.headers["set-cookie"]).toBeDefined();
    });
  });
});
