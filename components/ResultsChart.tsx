"use client";

import type { Poll } from "@/lib/types";

interface ResultsChartProps {
  poll: Poll;
}

export default function ResultsChart({ poll }: ResultsChartProps) {
  const total = poll.voteCounts.reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Live results</span>
        <span>{total} vote{total !== 1 ? "s" : ""}</span>
      </div>
      <div className="space-y-2">
        {poll.options.map((option, index) => {
          const count = poll.voteCounts[index] ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;

          return (
            <div key={option}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-slate-700">{option}</span>
                <span className="tabular-nums text-slate-500">
                  {count} ({pct}%)
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-stellar transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
