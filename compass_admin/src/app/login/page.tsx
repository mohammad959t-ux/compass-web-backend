"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, Card, Input, ThemeToggle, useToast } from "@compass/ui";

import { useAuth } from "../../components/shell/Protected";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values);
      toast({ title: "Welcome back", description: "Redirecting to dashboard." });
      const next = searchParams.get("next") ?? "/";
      router.replace(next);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Check your credentials and try again.",
        variant: "danger"
      });
    }
  };

  return (
    <Card className="w-full max-w-md space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-text/60">Compass Admin</p>
          <h1 className="font-display text-2xl font-semibold text-text">Sign in</h1>
        </div>
        <ThemeToggle />
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" error={errors.email?.message} {...register("email")} />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>
      <div className="rounded-lg border border-border bg-muted/60 p-3 text-xs text-text/70">
        Use your Compass admin credentials. Session cookies are handled via the API.
      </div>
    </Card>
  );
}
