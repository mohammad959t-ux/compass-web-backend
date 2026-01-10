import { Card } from "@compass/ui";

export function ProcessSteps() {
  const steps = [
    {
      title: "Discovery",
      description: "Align on goals, audiences, and success metrics."
    },
    {
      title: "Design",
      description: "Craft UX flows and premium visuals with fast feedback loops."
    },
    {
      title: "Launch",
      description: "Build, test, and ship with clear handoff and analytics."
    }
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-text/60">Process</p>
        <h2 className="font-display text-3xl font-semibold text-text">A focused, transparent sprint.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step.title} className="space-y-2">
            <p className="text-xs text-text/60">Step {index + 1}</p>
            <h3 className="text-lg font-semibold text-text">{step.title}</h3>
            <p className="text-sm text-text/70">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
