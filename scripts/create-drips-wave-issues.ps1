# Create all 6 Drips Wave issues on GitHub
# Requires: GitHub CLI — https://cli.github.com/
# Usage:   .\scripts\create-drips-wave-issues.ps1
#          .\scripts\create-drips-wave-issues.ps1 -DryRun

param(
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$IssuesDir = Join-Path $RepoRoot ".github\issues\drips-wave"

function Get-GhExecutable {
    $cmd = Get-Command gh -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }

    $candidates = @(
        "${env:ProgramFiles}\GitHub CLI\gh.exe",
        "${env:LOCALAPPDATA}\Programs\GitHub CLI\gh.exe"
    )
    foreach ($path in $candidates) {
        if (Test-Path $path) { return $path }
    }

    Write-Error "GitHub CLI (gh) is not installed. Install from https://cli.github.com/ then run: gh auth login"
}

$Gh = Get-GhExecutable

$issues = @(
    @{
        Title = "feat(ui): show poll total vote count in PollCard header"
        Body  = "01-trivial-poll-vote-count.md"
    },
    @{
        Title = "docs: add Windows setup notes for contract and frontend dev"
        Body  = "02-trivial-windows-docs.md"
    },
    @{
        Title = "feat(integration): replace mock poll data with Soroban contract RPC reads"
        Body  = "03-medium-soroban-rpc.md"
    },
    @{
        Title = "feat(contract): add poll expiration timestamps and block expired votes"
        Body  = "04-medium-poll-expiration.md"
    },
    @{
        Title = "feat(ui): add transaction status toast for wallet connect and vote actions"
        Body  = "05-medium-status-toast.md"
    },
    @{
        Title = "feat(contract): implement token-weighted voting with configurable asset"
        Body  = "06-high-token-weighted-voting.md"
    }
)

Write-Host "Creating $($issues.Count) Drips Wave issues..." -ForegroundColor Cyan

foreach ($issue in $issues) {
    $bodyFile = Join-Path $IssuesDir $issue.Body

    if (-not (Test-Path $bodyFile)) {
        Write-Error "Missing body file: $bodyFile"
    }

    Write-Host "`n→ $($issue.Title)" -ForegroundColor Yellow

    if ($DryRun) {
        Write-Host "  [dry-run] gh issue create --title `"$($issue.Title)`" --body-file `"$bodyFile`""
        continue
    }

    & $Gh issue create `
        --title $issue.Title `
        --body-file $bodyFile

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to create issue: $($issue.Title)"
    }
}

Write-Host "`nDone. View issues using: gh issue list" -ForegroundColor Green