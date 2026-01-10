import { Reveal } from "@compass/ui";

import { ServicesGrid } from "./ServicesGrid";

export function ServicesPreview() {
  return (
    <section className="space-y-8">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-text/60">Services</p>
          <h2 className="font-display text-3xl font-semibold text-text">
            Designed for teams who want clarity and momentum.
          </h2>
        </div>
      </Reveal>
      <ServicesGrid />
    </section>
  );
}
