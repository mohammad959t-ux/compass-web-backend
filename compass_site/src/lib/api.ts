import { createApiClient } from "@compass/ui";

import { packages, portfolio, reviews, services } from "../content/copy";

const api = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  credentials: "omit"
});

export async function fetchServices() {
  try {
    const data = await api.get<typeof services>("/services");
    return data ?? services;
  } catch {
    return services;
  }
}

export async function fetchService(slug: string) {
  try {
    return await api.get(`/services/${slug}`);
  } catch {
    return services.find((item) => item.slug === slug);
  }
}

export async function fetchPortfolio() {
  try {
    const data = await api.get<typeof portfolio>("/projects");
    return data ?? portfolio;
  } catch {
    return portfolio;
  }
}

export async function fetchProject(slug: string) {
  try {
    return await api.get(`/projects/${slug}`);
  } catch {
    return portfolio.find((item) => item.slug === slug);
  }
}

export async function fetchPackages() {
  try {
    const data = await api.get<typeof packages>("/packages");
    return data ?? packages;
  } catch {
    return packages;
  }
}

export async function fetchPackage(slug: string) {
  try {
    return await api.get(`/packages/${slug}`);
  } catch {
    return packages.find((item) => item.slug === slug);
  }
}

export async function fetchReviews() {
  try {
    const data = await api.get<typeof reviews>("/reviews");
    return data ?? reviews;
  } catch {
    return reviews;
  }
}

export async function submitLead(payload: {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}) {
  return api.post("/leads", payload);
}

export async function submitReview(payload: {
  token: string;
  rating: number;
  comment: string;
}) {
  return api.post("/reviews/submit", payload);
}
