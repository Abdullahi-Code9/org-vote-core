"use client";

import { useCallback, useState } from "react";
import type { Poll } from "@/lib/types";
import { INITIAL_POLLS, castVoteLocal } from "@/lib/polls";
import { useWallet } from "./WalletProvider";
import PollCard from "./PollCard";

export default function PollList() {
  const { publicKey } = useWallet();
  const [polls, setPolls] = useState<Poll[]>(INITIAL_POLLS);
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
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

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Active Polls</h2>
          <p className="mt-1 text-slate-500">
            {polls.length} open governance vote{polls.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

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
