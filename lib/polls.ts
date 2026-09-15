import { isContractConfigured } from "./config";
import type { Poll } from "./types";

/** Seed polls used when RPC is unavailable or contract ID is unset. */
export const INITIAL_POLLS: Poll[] = [
  {
    id: 1,
    title: "Approve Q3 Treasury Allocation",
    options: ["Approve", "Reject", "Abstain"],
    voteCounts: [12, 3, 2],
    creator: "GCKFBEIYTKPGAQQLRGQNE7OXY3H6G5H5QZ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z",
  },
  {
    id: 2,
    title: "Board Member Election 2026",
    options: ["Alice Chen", "Bob Okonkwo", "Carla Mendez"],
    voteCounts: [8, 5, 11],
    creator: "GBBO4ZDDZTZ5OQZ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z",
  },
  {
    id: 3,
    title: "Adopt Open Governance Charter",
    options: ["Yes", "No"],
    voteCounts: [19, 4],
    creator: "GCKFBEIYTKPGAQQLRGQNE7OXY3H6G5H5QZ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z",
  },
];

export type PollDataSource = "contract" | "mock";

export interface FetchPollsResult {
  polls: Poll[];
  source: PollDataSource;
  error?: string;
}

/** Load polls from Soroban RPC when configured; otherwise fall back to mock data. */
export async function fetchPollsWithFallback(): Promise<FetchPollsResult> {
  if (!isContractConfigured()) {
    return { polls: INITIAL_POLLS, source: "mock" };
  }

  try {
    const { fetchPollsFromContract } = await import("./contract");
    const polls = await fetchPollsFromContract();
    return { polls, source: "contract" };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch polls from Soroban RPC";
    return { polls: INITIAL_POLLS, source: "mock", error: message };
  }
}

export function castVoteLocal(
  polls: Poll[],
  pollId: number,
  optionIndex: number,
  voterKey: string,
  votedPolls: Set<string>
): { polls: Poll[]; votedPolls: Set<string> } | { error: string } {
  const voteKey = `${pollId}:${voterKey}`;
  if (votedPolls.has(voteKey)) {
    return { error: "You have already voted in this poll." };
  }

  const nextPolls = polls.map((poll) => {
    if (poll.id !== pollId) return poll;
    if (optionIndex < 0 || optionIndex >= poll.options.length) return poll;

    const voteCounts = [...poll.voteCounts];
    voteCounts[optionIndex] += 1;
    return { ...poll, voteCounts };
  });

  const nextVoted = new Set(votedPolls);
  nextVoted.add(voteKey);

  return { polls: nextPolls, votedPolls: nextVoted };
}
