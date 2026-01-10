import Link from "next/link";

import { Badge, Button, Card } from "@compass/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card/40 px-8 py-16 shadow-card">
      <div className="absolute right-0 top-0 h-48 w-48 -translate-y-10 translate-x-10 rounded-full bg-gradient-to-br from-accent-from/40 to-accent-to/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-56 w-56 -translate-x-10 translate-y-10 rounded-full bg-gradient-to-tr from-accent-to/30 to-accent-from/10 blur-3xl" />
      <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Badge variant="outline">Premium Digital Studio</Badge>
          <h1 className="font-display text-4xl font-semibold leading-tight text-text md:text-5xl">
            We craft digital experiences that move bold brands forward.
          </h1>
          <p className="text-base text-text/70">
            Compass is a strategy-first studio for teams who want a premium web presence, clear
            messaging, and reliable growth systems.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/portfolio">View work</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          <Card className="space-y-3">
            <p className="text-xs uppercase text-text/60">What we deliver</p>
            <ul className="space-y-2 text-sm text-text/70">
              <li>Brand + UX strategy workshops</li>
              <li>Conversion-driven web experiences</li>
              <li>Automated growth systems</li>
            </ul>
          </Card>
          <Card className="space-y-3">
            <p className="text-xs uppercase text-text/60">Recent results</p>
            <ul className="space-y-2 text-sm text-text/70">
              <li>+42% lead conversion for SaaS clients</li>
              <li>3x faster onboarding flows</li>
              <li>New revenue streams within 60 days</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
