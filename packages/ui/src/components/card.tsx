import * as React from "react";

import { cn } from "../lib/cn";

export function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}
