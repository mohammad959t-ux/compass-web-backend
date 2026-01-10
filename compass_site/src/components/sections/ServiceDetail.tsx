"use client";

import * as React from "react";
import Link from "next/link";

import { Badge, Button, Card } from "@compass/ui";

import { fetchService } from "../../lib/api";
import { services } from "../../content/copy";

type ServiceItem = (typeof services)[number] & {
  price?: number;
};

export function ServiceDetail({ slug }: { slug: string }) {
  const fallback = services.find((item) => item.slug === slug) as ServiceItem | undefined;
  const [service, setService] = React.useState<ServiceItem | undefined>(fallback);

  React.useEffect(() => {
    fetchService(slug).then((data) => {
      if (data) setService(data as typeof fallback);
    });
  }, [slug]);

  if (!service) {
    return (
      <Card>
        <p className="text-sm text-text/70">Service details are loading.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Badge variant="outline">Service</Badge>
      <div className="space-y-3">
        <h1 className="font-display text-4xl font-semibold text-text">{service.title}</h1>
        <p className="text-sm text-text/70">{service.description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {service.features.map((feature) => (
          <Card key={feature} className="p-4">
            <p className="text-sm font-medium text-text">{feature}</p>
          </Card>
        ))}
      </div>
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-text/60">Typical investment</p>
          <p className="text-lg font-semibold text-text">
            {service.priceRange ??
              (service.price ? `$${service.price.toLocaleString()}` : null)}
          </p>
        </div>
        <Button asChild>
          <Link href="/contact">Book a consultation</Link>
        </Button>
      </Card>
    </div>
  );
}


