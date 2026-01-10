"use client";

import * as React from "react";
import Link from "next/link";

import { Card, Stagger, StaggerItem, Badge } from "@compass/ui";

import { fetchPortfolio } from "../../lib/api";
import { portfolio as fallback } from "../../content/copy";

export function PortfolioGrid() {
  const [items, setItems] = React.useState(fallback);

  React.useEffect(() => {
    fetchPortfolio().then((data) => {
      if (Array.isArray(data)) setItems(data);
    });
  }, []);

  return (
    <Stagger className="grid gap-6 md:grid-cols-3">
      {items.map((project) => (
        <StaggerItem key={project.slug}>
          <Card className="flex h-full flex-col gap-4">
            <Badge variant="outline">{project.category}</Badge>
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-text">{project.title}</h3>
              <p className="text-sm text-text/70">{project.summary}</p>
            </div>
            <Link
              href={`/portfolio/${project.slug}`}
              className="text-sm font-semibold text-text underline-offset-4 hover:underline"
            >
              View project
            </Link>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}


