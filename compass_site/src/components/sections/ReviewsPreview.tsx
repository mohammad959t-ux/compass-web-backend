import Link from "next/link";

import { Button, Reveal } from "@compass/ui";

import { ReviewsGrid } from "./ReviewsGrid";

export function ReviewsPreview() {
  return (
    <section className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
      <Reveal>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-text/60">Testimonials</p>
          <h2 className="font-display text-3xl font-semibold text-text">
            Partners who trust Compass with their vision.
          </h2>
          <p className="text-sm text-text/70">
            We build deep partnerships with teams who want premium digital experiences.
          </p>
          <Button asChild variant="outline">
            <Link href="/reviews">Read reviews</Link>
          </Button>
        </div>
      </Reveal>
      <ReviewsGrid />
    </section>
  );
}
