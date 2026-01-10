import { type Request, type Response } from "express";

import { OrderModel } from "../../models/index.js";
import { nextOrderNumber } from "../../utils/orderNumber.js";

export async function listOrders(_req: Request, res: Response) {
  const items = await OrderModel.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function createOrder(req: Request, res: Response) {
  const { client, project, total, status, dueDate } = req.body as {
    client: string;
    project: string;
    total: number;
    status?: string;
    dueDate: string;
  };

  const order = await OrderModel.create({
    client,
    project: project || nextOrderNumber(),
    total: Number(total),
    status: status ?? "pending",
    dueDate
  });

  res.status(201).json(order);
}

export async function updateOrder(req: Request, res: Response) {
  const update = { ...req.body } as Record<string, unknown>;
  if (update.total) update.total = Number(update.total);

  const order = await OrderModel.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  res.json(order);
}

export async function deleteOrder(req: Request, res: Response) {
  await OrderModel.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}
