"use client";

import * as React from "react";
import Calendar from "react-calendar";

import { Badge, Card } from "@compass/ui";

import { PageHeader } from "../../components/ui/PageHeader";

const events = [
  {
    date: "2026-01-12",
    title: "Discovery call: Atlas Ventures",
    type: "call"
  },
  {
    date: "2026-01-15",
    title: "Design review: Lumen Payments",
    type: "review"
  },
  {
    date: "2026-01-18",
    title: "Launch: Veridian Health",
    type: "launch"
  }
];

export default function CalendarPage() {
  const [value, setValue] = React.useState<Date>(new Date());

  const upcoming = events.filter(
    (event) => new Date(event.date) >= new Date(value.toDateString())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Calendar" description="Keep track of milestones and client sessions." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <Calendar onChange={(date) => setValue(date as Date)} value={value} />
        </Card>
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-text">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map((event) => (
              <div key={event.title} className="rounded-lg border border-border bg-card/70 p-4">
                <Badge variant="outline">{event.type}</Badge>
                <p className="mt-2 text-sm font-semibold text-text">{event.title}</p>
                <p className="text-xs text-text/60">{event.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}