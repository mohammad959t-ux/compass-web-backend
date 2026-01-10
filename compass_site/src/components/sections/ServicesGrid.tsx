"use client";

import * as React from "react";
import Link from "next/link";

import { Card, Stagger, StaggerItem } from "@compass/ui";

import { fetchServices } from "../../lib/api";
import { services as fallback } from "../../content/copy";

type ServiceItem = (typeof fallback)[number] & {
  price?: number;
};

export function ServicesGrid() {
  const [items, setItems] = React.useState<ServiceItem[]>(fallback as ServiceItem[]);

  React.useEffect(() => {
    fetchServices().then((data) => {
      if (Array.isArray(data)) setItems(data);
    });
  }, []);

  return (
    <Stagger className="grid gap-6 md:grid-cols-3">
      {items.map((service) => (
        <StaggerItem key={service.slug} className="h-full">
          <Card className="flex h-full flex-col gap-4">
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-text">{service.title}</h3>
              <p className="text-sm text-text/70">{service.summary}</p>
            </div>
            <div className="text-xs text-text/60">
              {service.priceRange ?? (service.price ? `$${service.price.toLocaleString()}` : null)}
            </div>
            <Link
              href={`/services/${service.slug}`}
              className="text-sm font-semibold text-text underline-offset-4 hover:underline"
            >
              View service
            </Link>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}


