import { Card, Reveal } from "@compass/ui";

import { ContactForm } from "../../components/sections/ContactForm";

export default function ContactPage() {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
      <Reveal>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-text/60">Contact</p>
          <h1 className="font-display text-4xl font-semibold text-text">Tell us about your next launch.</h1>
          <p className="text-sm text-text/70">
            Share the goals, timeline, and budget. We will respond within 24 hours with a tailored plan.
          </p>
          <Card className="space-y-2">
            <p className="text-sm font-semibold text-text">Project intake</p>
            <p className="text-sm text-text/70">hello@compassdigitalservices.com</p>
            <p className="text-sm text-text/70">+971 (0)4 555 0123</p>
          </Card>
        </div>
      </Reveal>
      <Card className="space-y-6">
        <ContactForm />
      </Card>
    </div>
  );
}
