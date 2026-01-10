"use client";

import { LogOut } from "lucide-react";

import { Button, ThemeToggle } from "@compass/ui";

import { useAuth } from "./Protected";

export function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-border/70 bg-card/40 px-6 py-4 lg:px-8">
      <div>
        <p className="text-xs text-text/60">Welcome back</p>
        <h1 className="text-lg font-semibold text-text">{user?.name ?? "Team Member"}</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-border px-3 py-1 text-xs text-text/70">
          {user?.role ?? "member"}
        </span>
        <ThemeToggle />
        <Button variant="outline" onClick={logout} className="lg:hidden">
          <LogOut size={16} />
        </Button>
      </div>
    </header>
  );
}
