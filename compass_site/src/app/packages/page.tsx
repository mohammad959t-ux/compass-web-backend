import { Reveal } from "@compass/ui";

import { PackagesGrid } from "../../components/sections/PackagesGrid";

export default function PackagesPage() {
  return (
    <div className="space-y-10">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-text/60">Packages</p>
          <h1 className="font-display text-4xl font-semibold text-text">Flexible packages, clear scope.</h1>
          <p className="text-sm text-text/70">
            Choose a lane, then customize it based on your goals.
          </p>
        </div>
      </Reveal>
      <PackagesGrid />
    </div>
  );
}
