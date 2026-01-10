"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@compass/ui";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { fetchAnalytics, fetchLeads, fetchOrders } from "../../lib/api";
import { leads as fallbackLeads, orders as fallbackOrders } from "../../lib/mock-data";
import type { Lead, Order } from "../../lib/types";

export default function DashboardPage() {
  const [orders, setOrders] = React.useState<Order[]>(fallbackOrders);
  const [leads, setLeads] = React.useState<Lead[]>(fallbackLeads);
  const [analytics, setAnalytics] = React.useState({ revenue: 0, openLeads: 0, activeProjects: 0 });

  React.useEffect(() => {
    fetchOrders().then(setOrders);
    fetchLeads().then(setLeads);
    fetchAnalytics().then((data) => setAnalytics(data));
  }, []);

  const alerts = React.useMemo(() => {
    const overdueOrders = orders.filter(
      (order) => order.status !== "completed" && new Date(order.dueDate) < new Date()
    );
    const staleLeads = leads.filter((lead) => {
      const days = (Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      return lead.status === "new" && days > 3;
    });
    return {
      overdueOrders,
      staleLeads
    };
  }, [orders, leads]);

  const chartData = [
    { name: "Mon", revenue: 12 },
    { name: "Tue", revenue: 18 },
    { name: "Wed", revenue: 14 },
    { name: "Thu", revenue: 22 },
    { name: "Fri", revenue: 19 },
    { name: "Sat", revenue: 28 },
    { name: "Sun", revenue: 24 }
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="space-y-2">
          <p className="text-xs uppercase text-text/60">Monthly revenue</p>
          <p className="text-2xl font-semibold text-text">${analytics.revenue.toLocaleString()}</p>
          <p className="text-xs text-text/60">Targeting +18% vs last month</p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs uppercase text-text/60">Open leads</p>
          <p className="text-2xl font-semibold text-text">{analytics.openLeads}</p>
          <p className="text-xs text-text/60">Follow-ups scheduled</p>
        </Card>
        <Card className="space-y-2">
          <p className="text-xs uppercase text-text/60">Active projects</p>
          <p className="text-2xl font-semibold text-text">{analytics.activeProjects}</p>
          <p className="text-xs text-text/60">Pipeline healthy</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="space-y-4">
          <div>
            <p className="text-xs uppercase text-text/60">Revenue pulse</p>
            <h2 className="text-lg font-semibold text-text">Weekly performance</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="rgba(1,15,41,0.5)" />
                <YAxis stroke="rgba(1,15,41,0.5)" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#4167B1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="space-y-4">
          <div>
            <p className="text-xs uppercase text-text/60">Smart alerts</p>
            <h2 className="text-lg font-semibold text-text">Action required</h2>
          </div>
          <div className="space-y-3 text-sm text-text/70">
            {alerts.overdueOrders.length > 0 ? (
              <div className="rounded-lg border border-danger/30 bg-danger/10 p-3">
                {alerts.overdueOrders.length} orders are overdue. Review deadlines.
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-muted/60 p-3">No overdue orders.</div>
            )}
            {alerts.staleLeads.length > 0 ? (
              <div className="rounded-lg border border-warning/30 bg-warning/10 p-3">
                {alerts.staleLeads.length} leads need outreach today.
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-muted/60 p-3">All leads are in motion.</div>
            )}
          </div>
        </Card>
      </div>

      <Card className="space-y-4">
        <div>
          <p className="text-xs uppercase text-text/60">Orders</p>
          <h2 className="text-lg font-semibold text-text">Upcoming delivery timeline</h2>
        </div>
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Client</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deposit (20%)</TableHead>
              <TableHead>Due date</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-text">{order.client}</TableCell>
                <TableCell>{order.project}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "completed"
                        ? "success"
                        : order.status === "in-progress"
                        ? "warning"
                        : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>${(order.total * 0.2).toLocaleString()}</TableCell>
                <TableCell>{format(new Date(order.dueDate), "MMM dd, yyyy")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}