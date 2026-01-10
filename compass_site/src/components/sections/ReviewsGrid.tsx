"use client";

import * as React from "react";

import { Card, Stagger, StaggerItem } from "@compass/ui";

import { fetchReviews } from "../../lib/api";
import { reviews as fallback } from "../../content/copy";

export function ReviewsGrid() {
  const [items, setItems] = React.useState(fallback);

  React.useEffect(() => {
    fetchReviews().then((data) => {
      if (Array.isArray(data)) setItems(data);
    });
  }, []);

  return (
    <Stagger className="grid gap-6 md:grid-cols-3">
      {items.map((review, index) => (
        <StaggerItem key={`${review.name}-${index}`}>
          <Card className="flex h-full flex-col gap-4">
            <p className="text-sm text-text/70">"{review.quote}"</p>
            <div className="mt-auto">
              <p className="text-sm font-semibold text-text">{review.name}</p>
              <p className="text-xs text-text/60">{review.role}</p>
            </div>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}


