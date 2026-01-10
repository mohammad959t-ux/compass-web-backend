"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card } from "@compass/ui";

import { RoleGate } from "../../components/shell/Protected";
import { PageHeader } from "../../components/ui/PageHeader";

const data = [
  { name: "Web", value: 28 },
  { name: "Brand", value: 16 },
  { name: "Systems", value: 22 },
  { name: "Retention", value: 12 }
];

export default function AnalyticsPage() {
  return (
    <RoleGate allow={["admin"]}>
      <div className="space-y-6">
        <PageHeader title="Analytics" description="Performance insights for leadership." />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-text">Revenue by service</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="rgba(1,15,41,0.5)" />
                  <YAxis stroke="rgba(1,15,41,0.5)" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4167B1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-text">Quarterly notes</h2>
            <ul className="space-y-3 text-sm text-text/70">
              <li>Pipeline growth is pacing 22% above target.</li>
              <li>Average project margin increased by 6%.</li>
              <li>Referral intake is strongest from fintech partners.</li>
            </ul>
          </Card>
        </div>
      </div>
    </RoleGate>
  );
}
