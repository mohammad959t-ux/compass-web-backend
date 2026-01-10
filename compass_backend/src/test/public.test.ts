import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";
import { seedDefaults, seedUsers } from "../seed/seed.js";
import { ServiceModel, ProjectModel, PackageModel, ReviewModel, LeadModel } from "../models/index.js";

describe("Public Endpoints", () => {
  const app = createApp();

  beforeEach(async () => {
    // Seed test data before each test
    await seedUsers();
    await seedDefaults();
  });

  describe("GET /services", () => {
    it("should return list of services", async () => {
      const response = await request(app).get("/services");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return services sorted by createdAt desc", async () => {
      const response = await request(app).get("/services");

      if (response.body.length > 1) {
        const first = new Date(response.body[0].createdAt);
        const second = new Date(response.body[1].createdAt);
        expect(first.getTime()).toBeGreaterThanOrEqual(second.getTime());
      }
    });
  });

  describe("GET /services/:slug", () => {
    it("should return service by slug", async () => {
      // Get a service first
      const services = await ServiceModel.find();
      if (services.length > 0) {
        const service = services[0];
        const response = await request(app).get(`/services/${service.slug}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("slug");
        expect(response.body.slug).toBe(service.slug);
      }
    });

    it("should return 404 for non-existent slug", async () => {
      const response = await request(app).get("/services/non-existent-slug-12345");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Service not found");
    });
  });

  describe("GET /projects", () => {
    it("should return list of projects", async () => {
      const response = await request(app).get("/projects");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /projects/:slug", () => {
    it("should return project by slug", async () => {
      const projects = await ProjectModel.find();
      if (projects.length > 0) {
        const project = projects[0];
        const response = await request(app).get(`/projects/${project.slug}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("slug");
        expect(response.body.slug).toBe(project.slug);
      }
    });

    it("should return 404 for non-existent slug", async () => {
      const response = await request(app).get("/projects/non-existent-slug-12345");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Project not found");
    });
  });

  describe("GET /packages", () => {
    it("should return list of packages", async () => {
      const response = await request(app).get("/packages");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /packages/:slug", () => {
    it("should return package by slug", async () => {
      const packages = await PackageModel.find();
      if (packages.length > 0) {
        const packageItem = packages[0];
        const response = await request(app).get(`/packages/${packageItem.slug}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("slug");
        expect(response.body.slug).toBe(packageItem.slug);
      }
    });

    it("should return 404 for non-existent slug", async () => {
      const response = await request(app).get("/packages/non-existent-slug-12345");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Package not found");
    });
  });

  describe("GET /reviews", () => {
    it("should return only approved reviews", async () => {
      const response = await request(app).get("/reviews");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      // All reviews should be approved
      response.body.forEach((review: { status: string }) => {
        expect(review.status).toBe("approved");
      });
    });
  });

  describe("POST /leads", () => {
    it("should create a new lead", async () => {
      const leadData = {
        name: "Test Lead",
        email: "test@example.com",
        message: "This is a test message"
      };

      const response = await request(app)
        .post("/leads")
        .send(leadData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(leadData.name);
      expect(response.body.email).toBe(leadData.email);
    });

    it("should return 400 with invalid data", async () => {
      const response = await request(app)
        .post("/leads")
        .send({
          name: "Test Lead"
          // Missing required fields
        });

      expect(response.status).toBe(400);
    });

    it("should return 400 with invalid email", async () => {
      const response = await request(app)
        .post("/leads")
        .send({
          name: "Test Lead",
          email: "invalid-email",
          message: "Test message"
        });

      expect(response.status).toBe(400);
    });
  });
});
