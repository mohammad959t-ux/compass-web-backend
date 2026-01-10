import { Reveal } from "@compass/ui";

import { ServicesGrid } from "../../components/sections/ServicesGrid";

export default function ServicesPage() {
  return (
    <div className="space-y-10">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-text/60">Services</p>
          <h1 className="font-display text-4xl font-semibold text-text">Services built for growth.</h1>
          <p className="text-sm text-text/70">
            Strategy, design, and engineering support to move your brand forward.
          </p>
        </div>
      </Reveal>
      <ServicesGrid />
    </div>
  );
}
