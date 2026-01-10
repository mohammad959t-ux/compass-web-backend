"use client";

import * as React from "react";

import {
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useToast
} from "@compass/ui";

import { PageHeader } from "../../components/ui/PageHeader";
import { createReviewLink, fetchReviews } from "../../../lib/api";
import { reviews as fallbackReviews } from "../../../lib/mock-data";
import type { Review } from "../../../lib/types";

export default function ReviewsPage() {
  const [items, setItems] = React.useState<Review[]>(fallbackReviews);
  const [link, setLink] = React.useState<string | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    fetchReviews().then(setItems);
  }, []);

  const handleGenerate = async () => {
    const token = await createReviewLink();
    const origin = window.location.origin.includes("localhost:3001")
      ? "http://localhost:3000"
      : "https://compassdigitalservices.com";
    const url = `${origin}/review/${token}`;
    setLink(url);
    await navigator.clipboard.writeText(url);
    toast({
      title: "Review link copied",
      description: "Share it with the client to collect feedback.",
      variant: "success"
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews"
        description="Approve testimonials and generate feedback links."
        actionLabel="Generate link"
        onAction={handleGenerate}
      />

      {link ? (
        <Card className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-text/60">Latest review link</p>
            <p className="text-sm font-semibold text-text">{link}</p>
          </div>
          <Button variant="outline" onClick={() => navigator.clipboard.writeText(link)}>
            Copy again
          </Button>
        </Card>
      ) : null}

      <Card>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Token</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {items.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium text-text">{review.client}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      review.status === "approved"
                        ? "success"
                        : review.status === "pending"
                        ? "warning"
                        : "default"
                    }
                  >
                    {review.status}
                  </Badge>
                </TableCell>
                <TableCell>{review.rating} / 5</TableCell>
                <TableCell>{review.token}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}