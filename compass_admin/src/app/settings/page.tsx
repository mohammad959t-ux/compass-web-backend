"use client";

import { Card, Switch } from "@compass/ui";

import { RoleGate } from "../../components/shell/Protected";
import { PageHeader } from "../../components/ui/PageHeader";

export default function SettingsPage() {
  return (
    <RoleGate allow={["admin"]}>
      <div className="space-y-6">
        <PageHeader title="Settings" description="Global admin preferences and policies." />
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text">Enable analytics sync</p>
              <p className="text-xs text-text/60">Sync dashboard metrics with the API nightly.</p>
            </div>
            <Switch checked onCheckedChange={() => undefined} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text">Require 2-step approvals</p>
              <p className="text-xs text-text/60">Enable for expenses above $5,000.</p>
            </div>
            <Switch checked={false} onCheckedChange={() => undefined} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text">Notify on new leads</p>
              <p className="text-xs text-text/60">Send Slack notifications for inbound leads.</p>
            </div>
            <Switch checked onCheckedChange={() => undefined} />
          </div>
        </Card>
      </div>
    </RoleGate>
  );
}
