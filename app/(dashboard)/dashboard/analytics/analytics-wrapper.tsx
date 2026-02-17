"use client";

import dynamic from "next/dynamic";
import type { AnalyticsData } from "./page";

const AnalyticsDashboard = dynamic(
  () => import("./analytics-dashboard").then((mod) => mod.AnalyticsDashboard),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full animate-pulse bg-muted rounded-xl" />
    ),
  },
);

export function AnalyticsDashboardWrapper({ data }: { data: AnalyticsData }) {
  return <AnalyticsDashboard data={data} />;
}
