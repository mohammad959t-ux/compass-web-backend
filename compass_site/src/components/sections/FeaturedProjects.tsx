import Link from "next/link";

import { Button, Reveal } from "@compass/ui";

import { PortfolioGrid } from "./PortfolioGrid";

export function FeaturedProjects() {
  return (
    <section className="space-y-8">
      <Reveal>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wide text-text/60">Portfolio</p>
            <h2 className="font-display text-3xl font-semibold text-text">
              Launches built for real outcomes.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/portfolio">Explore all</Link>
          </Button>
        </div>
      </Reveal>
      <PortfolioGrid />
    </section>
  );
}
