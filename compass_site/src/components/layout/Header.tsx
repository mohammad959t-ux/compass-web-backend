"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button, Drawer, ThemeToggle } from "@compass/ui";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" }
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold text-text">
          Compass <span className="gradient-text">Digital</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-text/70 transition hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-accent-from after:to-accent-to after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild variant="primary">
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border border-border bg-card p-2 text-text md:hidden"
        >
          <Menu size={20} />
        </button>
      </div>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Compass">
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-text"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild onClick={() => setOpen(false)}>
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>
      </Drawer>
    </header>
  );
}
