"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Card,
  Drawer,
  FileUpload,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@compass/ui";

import { PageHeader } from "../../components/ui/PageHeader";
import { fetchServices } from "../../../lib/api";
import { services as fallbackServices } from "../../../lib/mock-data";
import type { Service } from "../../../lib/types";

const schema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  price: z.coerce.number().min(500)
});

type FormValues = z.infer<typeof schema>;

export default function ServicesPage() {
  const [items, setItems] = React.useState<Service[]>(fallbackServices);
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    fetchServices().then(setItems);
  }, []);

  const onSubmit = (values: FormValues) => {
    const newService: Service = {
      id: `SVC-${Math.floor(Math.random() * 900 + 100)}`,
      name: values.name,
      category: values.category,
      price: values.price
    };
    setItems((prev) => [newService, ...prev]);
    reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        description="Manage service catalog and pricing."
        actionLabel="Add service"
        onAction={() => setOpen(true)}
      />

      <Card>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium text-text">{service.name}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>${service.price.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Add service">
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Service name" error={errors.name?.message} {...register("name")} />
          <Input label="Category" error={errors.category?.message} {...register("category")} />
          <Input label="Price" type="number" error={errors.price?.message} {...register("price")} />
          <FileUpload label="Service cover" accept="image/*" />
          <Button type="submit">Save service</Button>
        </form>
      </Drawer>
    </div>
  );
}