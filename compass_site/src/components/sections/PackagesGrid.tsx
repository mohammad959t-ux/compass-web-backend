"use client";

import * as React from "react";
import Link from "next/link";

import { Card, Stagger, StaggerItem, Button } from "@compass/ui";

import { fetchPackages } from "../../lib/api";
import { packages as fallback } from "../../content/copy";

type PackageItem = (typeof fallback)[number] & {
  price: string | number;
  priceLabel?: string;
};

export function PackagesGrid() {
  const [items, setItems] = React.useState<PackageItem[]>(fallback as PackageItem[]);

  React.useEffect(() => {
    fetchPackages().then((data) => {
      if (Array.isArray(data)) setItems(data);
    });
  }, []);

  return (
    <Stagger className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <StaggerItem key={item.slug}>
          <Card className="flex h-full flex-col gap-4">
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-text/70">{item.description}</p>
            </div>
            <div className="text-xl font-semibold text-text">
              {typeof item.price === "number"
                ? `$${item.price.toLocaleString()}`
                : item.price ?? item.priceLabel}
            </div>
            <Button asChild variant="outline" className="mt-auto">
              <Link href={`/packages/${item.slug}`}>See details</Link>
            </Button>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}


