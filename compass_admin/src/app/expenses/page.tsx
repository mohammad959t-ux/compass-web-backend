"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
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
  TableRow
} from "@compass/ui";

import { PageHeader } from "../../components/ui/PageHeader";
import { fetchExpenses } from "../../../lib/api";
import { expenses as fallbackExpenses } from "../../../lib/mock-data";
import type { Expense } from "../../../lib/types";

const schema = z.object({
  vendor: z.string().min(2),
  category: z.string().min(2),
  amount: z.coerce.number().min(1),
  date: z.string().min(1)
});

type FormValues = z.infer<typeof schema>;

export default function ExpensesPage() {
  const [items, setItems] = React.useState<Expense[]>(fallbackExpenses);
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    fetchExpenses().then(setItems);
  }, []);

  const onSubmit = (values: FormValues) => {
    const newExpense: Expense = {
      id: `EXP-${Math.floor(Math.random() * 900 + 100)}`,
      vendor: values.vendor,
      category: values.category,
      amount: values.amount,
      date: values.date
    };
    setItems((prev) => [newExpense, ...prev]);
    reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Monitor spend across vendors and tools."
        actionLabel="Log expense"
        onAction={() => setOpen(true)}
      />

      <Card>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium text-text">{expense.vendor}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>${expense.amount.toLocaleString()}</TableCell>
                <TableCell>{expense.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Log expense">
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Vendor" error={errors.vendor?.message} {...register("vendor")} />
          <Input label="Category" error={errors.category?.message} {...register("category")} />
          <Input label="Amount" type="number" error={errors.amount?.message} {...register("amount")} />
          <Input label="Date" type="date" error={errors.date?.message} {...register("date")} />
          <Button type="submit">Save expense</Button>
        </form>
      </Drawer>
    </div>
  );
}