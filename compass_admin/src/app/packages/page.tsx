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
import { fetchPackages } from "../../../lib/api";
import { packages as fallbackPackages } from "../../../lib/mock-data";
import type { Package } from "../../../lib/types";

const schema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().min(500),
  status: z.enum(["live", "draft"])
});

type FormValues = z.infer<typeof schema>;

export default function PackagesPage() {
  const [items, setItems] = React.useState<Package[]>(fallbackPackages);
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    fetchPackages().then(setItems);
  }, []);

  const onSubmit = (values: FormValues) => {
    const newPackage: Package = {
      id: `PKG-${Math.floor(Math.random() * 900 + 100)}`,
      name: values.name,
      price: values.price,
      status: values.status
    };
    setItems((prev) => [newPackage, ...prev]);
    reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Packages"
        description="Manage pricing packages and visibility."
        actionLabel="New package"
        onAction={() => setOpen(true)}
      />

      <Card>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium text-text">{pkg.name}</TableCell>
                <TableCell>{pkg.status}</TableCell>
                <TableCell>${pkg.price.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Create package">
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Package name" error={errors.name?.message} {...register("name")} />
          <Input label="Price" type="number" error={errors.price?.message} {...register("price")} />
          <Select
            label="Status"
            options={[
              { label: "Live", value: "live" },
              { label: "Draft", value: "draft" }
            ]}
            {...register("status")}
          />
          <Button type="submit">Save package</Button>
        </form>
      </Drawer>
    </div>
  );
}