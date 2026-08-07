## Description

The frontend currently reads polls from hardcoded mock data in `lib/polls.ts`. Wire the UI to a deployed Soroban contract using Stellar RPC so active polls and vote tallies come from chain state.

## Acceptance Criteria

- [ ] Add contract client module (e.g. `lib/contract.ts`) using Stellar SDK / Soroban RPC.
- [ ] Contract ID and network (testnet) are configurable via env vars (e.g. `.env.example` with `NEXT_PUBLIC_CONTRACT_ID`, `NEXT_PUBLIC_STELLAR_NETWORK`).
- [ ] `PollList` loads polls from `get_poll` (or a documented index/range strategy if only single-poll reads exist).
- [ ] UI shows a loading state while fetching and a friendly error if RPC/contract is unavailable.
- [ ] Mock data remains usable as fallback when env vars are unset (documented in README).
- [ ] `npm run build` passes; README updated with integration setup steps.

## Points

**150** — Medium

## Hints

- Relevant files: `lib/polls.ts`, `components/PollList.tsx`, `contracts/src/lib.rs`
- Contract API: `get_poll(env, poll_id)`, `cast_vote(env, poll_id, option_index, voter)`
