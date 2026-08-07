## Description

Wallet connect and vote actions need clearer feedback. Add a reusable toast/notification component for pending, success, and error states during connect, vote submit, and disconnect.

## Acceptance Criteria

- [ ] Reusable component (e.g. `components/StatusToast.tsx`) with variants: `info`, `success`, `error`.
- [ ] Wallet connect shows loading → success/error toast.
- [ ] Vote submit shows pending → success/error toast (including "already voted" case).
- [ ] Toasts auto-dismiss after a configurable duration; manual dismiss optional.
- [ ] Accessible: `role="status"` or `role="alert"` as appropriate; sufficient color contrast.
- [ ] Replaces or consolidates existing ad-hoc toast logic in `PollList`.
- [ ] `npm run build` passes.

## Points

**150** — Medium

## Hints

- Relevant files: `components/PollList.tsx`, `components/WalletProvider.tsx`, `components/WalletConnect.tsx`
