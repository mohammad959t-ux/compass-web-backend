import { Reveal } from "@compass/ui";

import { PackagesGrid } from "./PackagesGrid";

export function PackagesPreview() {
  return (
    <section className="space-y-8">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-text/60">Packages</p>
          <h2 className="font-display text-3xl font-semibold text-text">
            Transparent pricing with clear deliverables.
          </h2>
        </div>
      </Reveal>
      <PackagesGrid />
    </section>
  );
}
