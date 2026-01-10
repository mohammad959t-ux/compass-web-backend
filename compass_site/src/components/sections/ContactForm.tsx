"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, Input, Select, Textarea, useToast } from "@compass/ui";

import { submitLead } from "../../lib/api";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Use a valid email"),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Share a few details about your project")
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await submitLead(values);
      toast({
        title: "Request received",
        description: "We will reach out within 24 hours.",
        variant: "success"
      });
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "danger"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Name" error={errors.name?.message} {...register("name")} />
        <Input label="Email" error={errors.email?.message} {...register("email")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Company" {...register("company")} />
        <Select
          label="Budget"
          options={[
            { label: "Select budget", value: "" },
            { label: "$2k - $5k", value: "2-5k" },
            { label: "$5k - $10k", value: "5-10k" },
            { label: "$10k+", value: "10k+" }
          ]}
          {...register("budget")}
        />
      </div>
      <Textarea
        label="Project details"
        error={errors.message?.message}
        {...register("message")}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Send request
      </Button>
    </form>
  );
}

