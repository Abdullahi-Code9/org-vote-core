## Description

Polls currently stay open indefinitely. Add an optional expiration timestamp at poll creation and reject votes after expiry.

## Acceptance Criteria

- [ ] `Poll` struct extended with `expires_at: u64` (ledger timestamp or documented time source).
- [ ] `create_poll` accepts expiration parameter (or `0`/sentinel for no expiration — document behavior).
- [ ] `cast_vote` reverts with a clear panic/error if poll is expired.
- [ ] `get_poll` returns expiration field.
- [ ] Unit tests cover: vote before expiry succeeds, vote after expiry fails, no-expiry polls still work.
- [ ] Contract builds with `stellar contract build` (or `cargo test` if CLI unavailable).
- [ ] Brief API note added to `README.md` contract table.

## Points

**150** — Medium

## Hints

- Relevant file: `contracts/src/lib.rs`
- Use `env.ledger().timestamp()` for expiry checks
