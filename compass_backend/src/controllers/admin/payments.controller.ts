import { type Request, type Response } from "express";

import { PaymentModel } from "../../models/index.js";

export async function listPayments(_req: Request, res: Response) {
  const items = await PaymentModel.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function createPayment(req: Request, res: Response) {
  const { orderId, amount, status, method, paidAt, note } = req.body as {
    orderId: string;
    amount: number;
    status?: string;
    method?: string;
    paidAt?: string;
    note?: string;
  };

  const payment = await PaymentModel.create({
    orderId,
    amount: Number(amount),
    status: status ?? "pending",
    method,
    paidAt: paidAt ? new Date(paidAt) : undefined,
    note
  });

  res.status(201).json(payment);
}

export async function updatePayment(req: Request, res: Response) {
  const update = { ...req.body } as Record<string, unknown>;
  if (update.amount) update.amount = Number(update.amount);
  if (update.paidAt) update.paidAt = new Date(String(update.paidAt));

  const payment = await PaymentModel.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!payment) {
    res.status(404).json({ message: "Payment not found" });
    return;
  }
  res.json(payment);
}

export async function deletePayment(req: Request, res: Response) {
  await PaymentModel.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}
