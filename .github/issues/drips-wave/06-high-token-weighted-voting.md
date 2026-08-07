## Description

Move beyond one-address-one-vote by weighting votes by a Stellar/Soroban token balance at vote time. Enables governance where voting power reflects token holdings.

## Acceptance Criteria

- [ ] Contract stores a configurable token contract address per poll (or global admin setting — document choice).
- [ ] `cast_vote` reads voter token balance via Soroban token interface and adds that weight to the selected option tally (not just `+1`).
- [ ] One vote per voter per poll still enforced (cannot vote twice to stack balance reads).
- [ ] Handles zero-balance voters with a clear revert or minimum threshold (documented).
- [ ] `get_poll` returns weighted tallies; frontend/types updated if integrated in same PR (or follow-up issue linked).
- [ ] Unit tests with mocked token balances covering: weighted tally, single-vote enforcement, zero balance edge case.
- [ ] README section explaining token-weighted voting assumptions and testnet setup.

## Points

**200** — High

## Hints

- Relevant file: `contracts/src/lib.rs`
- Soroban token interface: `token::Client` for `balance` reads
- Consider test token deployment on Stellar testnet for integration testing
