"use client";

import * as React from "react";
import Link from "next/link";

import { Badge, Button, Card } from "@compass/ui";

import { fetchProject } from "../../lib/api";
import { portfolio } from "../../content/copy";

export function ProjectDetail({ slug }: { slug: string }) {
  const fallback = portfolio.find((item) => item.slug === slug);
  const [project, setProject] = React.useState(fallback);

  React.useEffect(() => {
    fetchProject(slug).then((data) => {
      if (data) setProject(data as typeof fallback);
    });
  }, [slug]);

  if (!project) {
    return (
      <Card>
        <p className="text-sm text-text/70">Project details are loading.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Badge variant="outline">{project.category}</Badge>
      <div className="space-y-3">
        <h1 className="font-display text-4xl font-semibold text-text">{project.title}</h1>
        <p className="text-sm text-text/70">{project.summary}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {project.results.map((result) => (
          <Card key={result} className="p-4">
            <p className="text-sm font-medium text-text">{result}</p>
          </Card>
        ))}
      </div>
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-text/60">Looking for a similar outcome?</p>
          <p className="text-lg font-semibold text-text">We can build it together.</p>
        </div>
        <Button asChild>
          <Link href="/contact">Start a project</Link>
        </Button>
      </Card>
    </div>
  );
}

