# Drips Wave Issues — Manual `gh` Commands

Run these from the repo root after installing [GitHub CLI](https://cli.github.com/) and authenticating (`gh auth login`).

Or use the automation script:

```powershell
# Windows
.\scripts\create-drips-wave-issues.ps1

# Preview without creating
.\scripts\create-drips-wave-issues.ps1 -DryRun
```

```bash
# macOS / Linux
chmod +x scripts/create-drips-wave-issues.sh
./scripts/create-drips-wave-issues.sh

# Preview without creating
./scripts/create-drips-wave-issues.sh --dry-run
```

---

## Individual Commands

### Issue 1 — Trivial (100 pts)

```bash
gh issue create \
  --title "feat(ui): show poll total vote count in PollCard header" \
  --label "good first issue,drips-wave,frontend,100pts" \
  --body-file .github/issues/drips-wave/01-trivial-poll-vote-count.md
```

### Issue 2 — Trivial (100 pts)

```bash
gh issue create \
  --title "docs: add Windows setup notes for contract and frontend dev" \
  --label "good first issue,drips-wave,documentation,100pts" \
  --body-file .github/issues/drips-wave/02-trivial-windows-docs.md
```

### Issue 3 — Medium (150 pts)

```bash
gh issue create \
  --title "feat(integration): replace mock poll data with Soroban contract RPC reads" \
  --label "help wanted,drips-wave,integration,frontend,150pts" \
  --body-file .github/issues/drips-wave/03-medium-soroban-rpc.md
```

### Issue 4 — Medium (150 pts)

```bash
gh issue create \
  --title "feat(contract): add poll expiration timestamps and block expired votes" \
  --label "help wanted,drips-wave,smart-contract,soroban,150pts" \
  --body-file .github/issues/drips-wave/04-medium-poll-expiration.md
```

### Issue 5 — Medium (150 pts)

```bash
gh issue create \
  --title "feat(ui): add transaction status toast for wallet connect and vote actions" \
  --label "help wanted,drips-wave,frontend,ui,150pts" \
  --body-file .github/issues/drips-wave/05-medium-status-toast.md
```

### Issue 6 — High (200 pts)

```bash
gh issue create \
  --title "feat(contract): implement token-weighted voting with configurable asset" \
  --label "help wanted,drips-wave,smart-contract,soroban,advanced,200pts" \
  --body-file .github/issues/drips-wave/06-high-token-weighted-voting.md
```

---

## Verify

```bash
gh issue list --label drips-wave
```

**Note:** Create labels in the repo first if they don't exist (`100pts`, `150pts`, `200pts`, `drips-wave`, etc.). GitHub will prompt or auto-create labels when using `gh issue create --label`.
