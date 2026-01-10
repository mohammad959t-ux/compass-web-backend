"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, Select, Textarea, useToast } from "@compass/ui";

import { submitReview } from "../../lib/api";

const schema = z.object({
  rating: z.string().min(1, "Select a rating"),
  comment: z.string().min(10, "Tell us about your experience")
});

type FormValues = z.infer<typeof schema>;

export function ReviewForm({ token }: { token: string }) {
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
      await submitReview({
        token,
        rating: Number(values.rating),
        comment: values.comment
      });
      toast({
        title: "Thanks for your review",
        description: "We appreciate your feedback.",
        variant: "success"
      });
      reset();
    } catch (error) {
      toast({
        title: "Could not submit review",
        description: "Please try again in a moment.",
        variant: "danger"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <Select
        label="Rating"
        options={[
          { label: "Select rating", value: "" },
          { label: "5 - Outstanding", value: "5" },
          { label: "4 - Great", value: "4" },
          { label: "3 - Good", value: "3" },
          { label: "2 - Needs work", value: "2" },
          { label: "1 - Poor", value: "1" }
        ]}
        error={errors.rating?.message}
        {...register("rating")}
      />
      <Textarea
        label="Feedback"
        error={errors.comment?.message}
        {...register("comment")}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Submit review
      </Button>
    </form>
  );
}

