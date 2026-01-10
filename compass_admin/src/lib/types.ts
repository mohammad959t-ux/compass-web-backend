export type OrderStatus = "pending" | "in-progress" | "completed";
export type ReviewStatus = "pending" | "approved" | "archived";
export type LeadStatus = "new" | "contacted" | "won" | "lost";

export type Order = {
  id: string;
  client: string;
  project: string;
  total: number;
  status: OrderStatus;
  dueDate: string;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  price: number;
};

export type Project = {
  id: string;
  name: string;
  status: "active" | "paused" | "complete";
  owner: string;
  budget: number;
};

export type Package = {
  id: string;
  name: string;
  price: number;
  status: "live" | "draft";
};

export type Review = {
  id: string;
  client: string;
  rating: number;
  status: ReviewStatus;
  token: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
};

export type Expense = {
  id: string;
  vendor: string;
  category: string;
  amount: number;
  date: string;
};