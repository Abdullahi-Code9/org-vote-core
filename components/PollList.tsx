"use client";

import { useCallback, useEffect, useState } from "react";
import type { Poll } from "@/lib/types";
import type { PollDataSource } from "@/lib/polls";
import { castVoteLocal, fetchPollsWithFallback } from "@/lib/polls";
import { useWallet } from "./WalletProvider";
import PollCard from "./PollCard";

export default function PollList() {
  const { publicKey } = useWallet();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [dataSource, setDataSource] = useState<PollDataSource>("mock");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPolls() {
      setLoading(true);
      setFetchError(null);

      const result = await fetchPollsWithFallback();

      if (cancelled) return;

      setPolls(result.polls);
      setDataSource(result.source);
      if (result.error) {
        setFetchError(result.error);
      }
      setLoading(false);
    }

    loadPolls();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleVote(pollId: number, optionIndex: number) {
    if (!publicKey) {
      showToast("Connect your wallet before voting.");
      return;
    }

    const result = castVoteLocal(
      polls,
      pollId,
      optionIndex,
      publicKey,
      votedPolls
    );

    if ("error" in result) {
      showToast(result.error);
      return;
    }

    setPolls(result.polls);
    setVotedPolls(result.votedPolls);
    showToast("Vote submitted successfully.");
  }

  function hasVoted(pollId: number): boolean {
    if (!publicKey) return false;
    return votedPolls.has(`${pollId}:${publicKey}`);
  }

  if (loading) {
    return (
      <section className="flex min-h-[240px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-stellar border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">
            Loading polls from Soroban…
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Active Polls</h2>
          <p className="mt-1 text-slate-500">
            {polls.length} open governance vote{polls.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              dataSource === "contract"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {dataSource === "contract" ? "Live testnet data" : "Mock data"}
          </span>
          {fetchError && (
            <p className="max-w-md text-xs text-amber-700">
              RPC fallback active: {fetchError}
            </p>
          )}
        </div>
      </div>

      {polls.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">No active polls found.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {polls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              voterKey={publicKey}
              hasVoted={hasVoted(poll.id)}
              onVote={handleVote}
            />
          ))}
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </section>
  );
}
