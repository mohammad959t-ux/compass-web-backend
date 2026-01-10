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
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@compass/ui";

import { PageHeader } from "../../components/ui/PageHeader";
import { fetchProjects } from "../../../lib/api";
import { projects as fallbackProjects } from "../../../lib/mock-data";
import type { Project } from "../../../lib/types";

const schema = z.object({
  name: z.string().min(2),
  owner: z.string().min(2),
  status: z.enum(["active", "paused", "complete"]),
  budget: z.coerce.number().min(1000)
});

type FormValues = z.infer<typeof schema>;

export default function ProjectsPage() {
  const [items, setItems] = React.useState<Project[]>(fallbackProjects);
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    fetchProjects().then(setItems);
  }, []);

  const onSubmit = (values: FormValues) => {
    const newProject: Project = {
      id: `PRJ-${Math.floor(Math.random() * 900 + 100)}`,
      name: values.name,
      owner: values.owner,
      status: values.status,
      budget: values.budget
    };
    setItems((prev) => [newProject, ...prev]);
    reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Track delivery status and budgets."
        actionLabel="New project"
        onAction={() => setOpen(true)}
      />

      <Card>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Project</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium text-text">{project.name}</TableCell>
                <TableCell>{project.owner}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>${project.budget.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Create project">
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Project name" error={errors.name?.message} {...register("name")} />
          <Input label="Owner" error={errors.owner?.message} {...register("owner")} />
          <Select
            label="Status"
            options={[
              { label: "Active", value: "active" },
              { label: "Paused", value: "paused" },
              { label: "Complete", value: "complete" }
            ]}
            {...register("status")}
          />
          <Input label="Budget" type="number" error={errors.budget?.message} {...register("budget")} />
          <FileUpload label="Project assets" accept="image/*" multiple />
          <Button type="submit">Save project</Button>
        </form>
      </Drawer>
    </div>
  );
}