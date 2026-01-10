"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Badge,
  Button,
  Card,
  Drawer,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip
} from "@compass/ui";

import { PageHeader } from "../../components/ui/PageHeader";
import { fetchOrders } from "../../../lib/api";
import { orders as fallbackOrders } from "../../../lib/mock-data";
import type { Order } from "../../../lib/types";

const schema = z.object({
  client: z.string().min(2),
  project: z.string().min(2),
  total: z.coerce.number().min(500),
  status: z.enum(["pending", "in-progress", "completed"]),
  dueDate: z.string().min(1)
});

type FormValues = z.infer<typeof schema>;

export default function OrdersPage() {
  const [items, setItems] = React.useState<Order[]>(fallbackOrders);
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    fetchOrders().then(setItems);
  }, []);

  const onSubmit = (values: FormValues) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      client: values.client,
      project: values.project,
      total: values.total,
      status: values.status,
      dueDate: values.dueDate
    };
    setItems((prev) => [newOrder, ...prev]);
    reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track deposits, milestones, and delivery timelines."
        actionLabel="New order"
        onAction={() => setOpen(true)}
      />

      <Card>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Client</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>
                <Tooltip content="Minimum deposit is 20% of total.">Deposit (20%)</Tooltip>
              </TableHead>
              <TableHead>Due date</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-text">{order.client}</TableCell>
                <TableCell>{order.project}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "completed"
                        ? "success"
                        : order.status === "in-progress"
                        ? "warning"
                        : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>${order.total.toLocaleString()}</TableCell>
                <TableCell>${(order.total * 0.2).toLocaleString()}</TableCell>
                <TableCell>{order.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Create order">
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Client" error={errors.client?.message} {...register("client")} />
          <Input label="Project" error={errors.project?.message} {...register("project")} />
          <Input
            label="Total value"
            type="number"
            error={errors.total?.message}
            {...register("total")}
          />
          <Select
            label="Status"
            options={[
              { label: "Pending", value: "pending" },
              { label: "In progress", value: "in-progress" },
              { label: "Completed", value: "completed" }
            ]}
            {...register("status")}
          />
          <Input label="Due date" type="date" error={errors.dueDate?.message} {...register("dueDate")} />
          <Button type="submit" className="mt-2">
            Save order
          </Button>
        </form>
      </Drawer>
    </div>
  );
}