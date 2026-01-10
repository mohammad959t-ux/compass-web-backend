import { createApiClient } from "@compass/ui";

import { expenses, leads, orders, packages, projects, reviews, services } from "./mock-data";
import type { Expense, Lead, Order, Package, Project, Review, Service } from "./types";

const api = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  credentials: "include"
});

export async function fetchOrders(): Promise<Order[]> {
  try {
    const data = await api.get<Order[]>("/admin/orders");
    return data ?? orders;
  } catch {
    return orders;
  }
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const data = await api.get<Service[]>("/admin/services");
    return data ?? services;
  } catch {
    return services;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const data = await api.get<Project[]>("/admin/projects");
    return data ?? projects;
  } catch {
    return projects;
  }
}

export async function fetchPackages(): Promise<Package[]> {
  try {
    const data = await api.get<Package[]>("/admin/packages");
    return data ?? packages;
  } catch {
    return packages;
  }
}

export async function fetchReviews(): Promise<Review[]> {
  try {
    const data = await api.get<Review[]>("/admin/reviews");
    return data ?? reviews;
  } catch {
    return reviews;
  }
}

export async function fetchLeads(): Promise<Lead[]> {
  try {
    const data = await api.get<Lead[]>("/admin/leads");
    return data ?? leads;
  } catch {
    return leads;
  }
}

export async function fetchExpenses(): Promise<Expense[]> {
  try {
    const data = await api.get<Expense[]>("/admin/expenses");
    return data ?? expenses;
  } catch {
    return expenses;
  }
}

export async function fetchAnalytics() {
  try {
    return await api.get("/admin/analytics");
  } catch {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const openLeads = leads.filter((lead) => lead.status === "new").length;
    const activeProjects = projects.filter((project) => project.status === "active").length;
    return {
      revenue,
      openLeads,
      activeProjects
    };
  }
}

export async function createReviewLink() {
  try {
    const data = await api.post<{ token: string }>("/admin/review-links", {});
    return data.token;
  } catch {
    return `local-${Math.random().toString(36).slice(2, 8)}`;
  }
}
