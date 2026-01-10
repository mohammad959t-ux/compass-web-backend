import Link from "next/link";

import { Button } from "@compass/ui";

export function FinalCTA() {
  return (
    <section className="rounded-3xl border border-border bg-gradient-to-r from-accent-from/10 via-card/60 to-accent-to/10 p-12 text-center">
      <h2 className="font-display text-3xl font-semibold text-text">Ready to build with Compass?</h2>
      <p className="mt-3 text-sm text-text/70">
        Tell us about your next launch, and we will send a tailored plan within 24 hours.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/contact">Start the project</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/services">See services</Link>
        </Button>
      </div>
    </section>
  );
}
