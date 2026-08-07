## Description

The README covers general setup but does not document Windows-specific commands (PowerShell separators, path notes, etc.). Update docs so Windows contributors can set up without trial and error.

## Acceptance Criteria

- [ ] `README.md` includes a short **Windows notes** subsection under Local Setup.
- [ ] Documents PowerShell-friendly commands (e.g. use `;` instead of `&&`, or run commands from `contracts/` separately).
- [ ] Links to Rust (`rustup.rs`) and Stellar CLI install docs.
- [ ] Mentions Freighter as optional for local UI dev (mock wallet fallback).
- [ ] No broken markdown or incorrect paths relative to the repo structure.

## Points

**100** — Trivial

## Hints

- Relevant file: `README.md`
- See `CONTRIBUTING.md` for existing Windows/PowerShell guidance gaps
