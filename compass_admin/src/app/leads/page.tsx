"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Badge,
  Button,
  Card,
  Drawer,
  Input,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@compass/ui";

import { PageHeader } from "../../components/ui/PageHeader";
import { fetchLeads } from "../../../lib/api";
import { leads as fallbackLeads } from "../../../lib/mock-data";
import type { Lead } from "../../../lib/types";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(["new", "contacted", "won", "lost"])
});

type FormValues = z.infer<typeof schema>;

export default function LeadsPage() {
  const [items, setItems] = React.useState<Lead[]>(fallbackLeads);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    fetchLeads().then(setItems);
  }, []);

  const onSubmit = (values: FormValues) => {
    const newLead: Lead = {
      id: `LED-${Math.floor(Math.random() * 900 + 100)}`,
      name: values.name,
      email: values.email,
      status: values.status,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setItems((prev) => [newLead, ...prev]);
    reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Track inbound demand and funnel stages."
        actionLabel="Add lead"
        onAction={() => setOpen(true)}
      />

      <Card>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium text-text">{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      lead.status === "won"
                        ? "success"
                        : lead.status === "lost"
                        ? "danger"
                        : lead.status === "contacted"
                        ? "warning"
                        : "default"
                    }
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>{lead.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Pagination page={page} totalPages={3} onPageChange={setPage} />
        </div>
      </Card>

      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Add lead">
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" error={errors.name?.message} {...register("name")} />
          <Input label="Email" error={errors.email?.message} {...register("email")} />
          <Select
            label="Status"
            options={[
              { label: "New", value: "new" },
              { label: "Contacted", value: "contacted" },
              { label: "Won", value: "won" },
              { label: "Lost", value: "lost" }
            ]}
            {...register("status")}
          />
          <Button type="submit">Save lead</Button>
        </form>
      </Drawer>
    </div>
  );
}