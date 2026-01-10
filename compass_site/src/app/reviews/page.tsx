import Link from "next/link";

import { Button, Reveal } from "@compass/ui";

import { ReviewsGrid } from "../../components/sections/ReviewsGrid";

export default function ReviewsPage() {
  return (
    <div className="space-y-10">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-text/60">Reviews</p>
          <h1 className="font-display text-4xl font-semibold text-text">Clients who moved with us.</h1>
          <p className="text-sm text-text/70">
            We are proud to be the partner of record for these teams.
          </p>
        </div>
      </Reveal>
      <ReviewsGrid />
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card/50 p-6">
        <div>
          <p className="text-sm text-text/60">Have a review link?</p>
          <h3 className="text-xl font-semibold text-text">Submit your feedback.</h3>
        </div>
        <Button asChild variant="outline">
          <Link href="/review/sample-token">Leave a review</Link>
        </Button>
      </div>
    </div>
  );
}
