import { Card, Reveal } from "@compass/ui";

import { ReviewForm } from "../../../components/sections/ReviewForm";

export function generateStaticParams() {
  return [{ token: "sample-token" }];
}

export default function ReviewTokenPage({ params }: { params: { token: string } }) {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
      <Reveal>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-text/60">Review</p>
          <h1 className="font-display text-4xl font-semibold text-text">Share your experience.</h1>
          <p className="text-sm text-text/70">
            Your feedback helps us craft better work. This review is tied to token:
            <span className="ml-2 rounded-md border border-border px-2 py-1 text-xs">{params.token}</span>
          </p>
        </div>
      </Reveal>
      <Card className="space-y-6">
        <ReviewForm token={params.token} />
      </Card>
    </div>
  );
}
