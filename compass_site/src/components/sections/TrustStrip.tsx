export function TrustStrip() {
  const metrics = [
    { label: "Avg. launch", value: "6 weeks" },
    { label: "Clients served", value: "120+" },
    { label: "Retention", value: "92%" }
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-xl border border-border bg-card/70 p-4">
          <p className="text-xs text-text/60">{metric.label}</p>
          <p className="text-lg font-semibold text-text">{metric.value}</p>
        </div>
      ))}
    </section>
  );
}
