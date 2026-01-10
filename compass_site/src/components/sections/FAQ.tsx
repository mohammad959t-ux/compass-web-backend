import { faqs } from "../../content/copy";

export function FAQ() {
  return (
    <section className="grid gap-6 rounded-3xl border border-border bg-card/40 p-10 md:grid-cols-[1fr_1fr]">
      <div className="space-y-3">
        <h2 className="font-display text-3xl font-semibold text-text">Questions, answered.</h2>
        <p className="text-sm text-text/70">
          Here is what most teams ask before starting. If you need something else, let us know.
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-text">{faq.question}</p>
            <p className="text-sm text-text/70">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
