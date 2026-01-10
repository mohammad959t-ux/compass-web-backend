import Link from "next/link";

import { Card, Reveal, Button } from "@compass/ui";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-text/60">About</p>
          <h1 className="font-display text-4xl font-semibold text-text">A boutique team for ambitious launches.</h1>
          <p className="text-sm text-text/70">
            Compass blends strategy, design, and engineering to help teams ship premium digital work.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Strategy-first",
            description:
              "Every project starts with the story, positioning, and conversion flow before design begins."
          },
          {
            title: "Design-led",
            description:
              "We craft interfaces that feel confident, modern, and ready for growth."
          },
          {
            title: "Launch support",
            description:
              "We stay close during launch week and beyond for iteration and optimization."
          }
        ].map((item) => (
          <Card key={item.title} className="space-y-2">
            <h3 className="font-display text-lg font-semibold text-text">{item.title}</h3>
            <p className="text-sm text-text/70">{item.description}</p>
          </Card>
        ))}
      </div>

      <Card className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <h2 className="font-display text-2xl font-semibold text-text">Operating globally, rooted in partnership.</h2>
          <p className="text-sm text-text/70">
            We work with founders and teams across the GCC, Europe, and North America. The process is
            collaborative, transparent, and designed to keep momentum high.
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-text/70">
            "Compass felt like an internal product team. We aligned quickly and shipped faster than any
            previous partner."
          </p>
          <p className="text-sm font-semibold text-text">- Noor Al Abbas, Director</p>
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card/50 p-6">
        <div>
          <p className="text-sm text-text/60">Ready to collaborate?</p>
          <h3 className="text-xl font-semibold text-text">Let us map your next launch.</h3>
        </div>
        <Button asChild>
          <Link href="/contact">Book a call</Link>
        </Button>
      </div>
    </div>
  );
}