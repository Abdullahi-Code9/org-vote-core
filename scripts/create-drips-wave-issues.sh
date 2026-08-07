#!/usr/bin/env bash
# Create all 6 Drips Wave issues on GitHub
# Requires: GitHub CLI — https://cli.github.com/
# Usage:   ./scripts/create-drips-wave-issues.sh
#          ./scripts/create-drips-wave-issues.sh --dry-run

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ISSUES_DIR="$REPO_ROOT/.github/issues/drips-wave"
DRY_RUN=false

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
fi

if ! command -v gh &>/dev/null; then
  echo "Error: GitHub CLI (gh) is not installed. Install from https://cli.github.com/ then run: gh auth login" >&2
  exit 1
fi

create_issue() {
  local title="$1"
  local labels="$2"
  local body_file="$3"

  echo "→ $title"

  if [[ "$DRY_RUN" == true ]]; then
    echo "  [dry-run] gh issue create --title \"$title\" --label \"$labels\" --body-file \"$body_file\""
    return
  fi

  gh issue create \
    --title "$title" \
    --label "$labels" \
    --body-file "$body_file"
}

echo "Creating 6 Drips Wave issues..."

create_issue \
  "feat(ui): show poll total vote count in PollCard header" \
  "good first issue,drips-wave,frontend,100pts" \
  "$ISSUES_DIR/01-trivial-poll-vote-count.md"

create_issue \
  "docs: add Windows setup notes for contract and frontend dev" \
  "good first issue,drips-wave,documentation,100pts" \
  "$ISSUES_DIR/02-trivial-windows-docs.md"

create_issue \
  "feat(integration): replace mock poll data with Soroban contract RPC reads" \
  "help wanted,drips-wave,integration,frontend,150pts" \
  "$ISSUES_DIR/03-medium-soroban-rpc.md"

create_issue \
  "feat(contract): add poll expiration timestamps and block expired votes" \
  "help wanted,drips-wave,smart-contract,soroban,150pts" \
  "$ISSUES_DIR/04-medium-poll-expiration.md"

create_issue \
  "feat(ui): add transaction status toast for wallet connect and vote actions" \
  "help wanted,drips-wave,frontend,ui,150pts" \
  "$ISSUES_DIR/05-medium-status-toast.md"

create_issue \
  "feat(contract): implement token-weighted voting with configurable asset" \
  "help wanted,drips-wave,smart-contract,soroban,advanced,200pts" \
  "$ISSUES_DIR/06-high-token-weighted-voting.md"

echo ""
echo "Done. View issues: gh issue list --label drips-wave"
