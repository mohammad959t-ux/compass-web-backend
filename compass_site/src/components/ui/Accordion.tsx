"use client";

import * as React from "react";

import { cn } from "@compass/ui";

export function Accordion({
  title,
  children,
  className
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("rounded-lg border border-border bg-card p-4", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-text"
      >
        {title}
        <span className="text-xs text-text/60">{open ? "-" : "+"}</span>
      </button>
      {open ? <div className="mt-2 text-sm text-text/70">{children}</div> : null}
    </div>
  );
}
