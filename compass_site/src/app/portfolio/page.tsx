import { Reveal } from "@compass/ui";

import { PortfolioGrid } from "../../components/sections/PortfolioGrid";

export default function PortfolioPage() {
  return (
    <div className="space-y-10">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-text/60">Portfolio</p>
          <h1 className="font-display text-4xl font-semibold text-text">Work that speaks for itself.</h1>
          <p className="text-sm text-text/70">
            A glimpse of the brands and teams we have helped move faster.
          </p>
        </div>
      </Reveal>
      <PortfolioGrid />
    </div>
  );
}
