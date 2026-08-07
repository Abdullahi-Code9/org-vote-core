"use client";

import { useState } from "react";
import type { Poll } from "@/lib/types";
import ResultsChart from "./ResultsChart";

interface PollCardProps {
  poll: Poll;
  voterKey: string | null;
  hasVoted: boolean;
  onVote: (pollId: number, optionIndex: number) => void;
}

export default function PollCard({
  poll,
  voterKey,
  hasVoted,
  onVote,
}: PollCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (selected === null || !voterKey) return;
    setSubmitting(true);
    onVote(poll.id, selected);
    setSubmitting(false);
  }

  const canVote = voterKey && !hasVoted;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-stellar">
          Poll #{poll.id}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">
          {poll.title}
        </h2>
      </header>

      <ResultsChart poll={poll} />

      <div className="mt-6 border-t border-slate-100 pt-5">
        {hasVoted ? (
          <p className="text-sm font-medium text-emerald-600">
            ✓ Your vote has been recorded for this poll.
          </p>
        ) : !voterKey ? (
          <p className="text-sm text-slate-500">
            Connect your Freighter wallet to cast a vote.
          </p>
        ) : (
          <>
            <p className="mb-3 text-sm font-medium text-slate-700">
              Cast your vote
            </p>
            <div className="flex flex-wrap gap-2">
              {poll.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    selected === index
                      ? "border-stellar bg-stellar-muted text-stellar-dark"
                      : "border-slate-200 text-slate-700 hover:border-stellar hover:text-stellar-dark"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selected === null || submitting || !canVote}
              className="mt-4 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Submitting…" : "Submit Vote"}
            </button>
          </>
        )}
      </div>
    </article>
  );
}
