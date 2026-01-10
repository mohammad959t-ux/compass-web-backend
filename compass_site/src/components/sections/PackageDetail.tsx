"use client";

import * as React from "react";
import Link from "next/link";

import { Badge, Button, Card } from "@compass/ui";

import { fetchPackage } from "../../lib/api";
import { packages } from "../../content/copy";

type PackageItem = (typeof packages)[number] & {
  price: string | number;
  priceLabel?: string;
};

export function PackageDetail({ slug }: { slug: string }) {
  const fallback = packages.find((item) => item.slug === slug) as PackageItem | undefined;
  const [pkg, setPackage] = React.useState<PackageItem | undefined>(fallback);

  React.useEffect(() => {
    fetchPackage(slug).then((data) => {
      if (data) setPackage(data as typeof fallback);
    });
  }, [slug]);

  if (!pkg) {
    return (
      <Card>
        <p className="text-sm text-text/70">Package details are loading.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Badge variant="outline">Package</Badge>
      <div className="space-y-3">
        <h1 className="font-display text-4xl font-semibold text-text">{pkg.title}</h1>
        <p className="text-sm text-text/70">{pkg.description}</p>
      </div>
      <Card className="space-y-3">
        <p className="text-sm font-semibold text-text">Included</p>
        <ul className="space-y-2 text-sm text-text/70">
          {pkg.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-text/60">Investment</p>
          <p className="text-lg font-semibold text-text">
            {typeof pkg.price === "number"
              ? `$${pkg.price.toLocaleString()}`
              : pkg.price ?? pkg.priceLabel}
          </p>
        </div>
        <Button asChild>
          <Link href="/contact">Book this package</Link>
        </Button>
      </Card>
    </div>
  );
}


