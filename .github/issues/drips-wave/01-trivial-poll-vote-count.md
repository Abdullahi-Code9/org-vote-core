## Description

Each poll card shows options and a results chart, but the total number of votes is only visible inside the chart footer. Add a clear vote total in the poll card header so users can scan activity at a glance.

## Acceptance Criteria

- [ ] Poll card header displays total votes for that poll (sum of all option counts).
- [ ] Count updates immediately after a user casts a vote in the UI.
- [ ] Uses correct singular/plural copy (`1 vote` vs `2 votes`).
- [ ] Styling matches existing Tailwind patterns in `components/PollCard.tsx`.
- [ ] `npm run build` passes with no TypeScript or lint errors.

## Points

**100** — Trivial

## Hints

- Relevant files: `components/PollCard.tsx`, `components/ResultsChart.tsx`
- Derive total from `poll.voteCounts.reduce(...)`
