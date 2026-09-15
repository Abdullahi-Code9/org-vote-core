# Org-Vote

![CI](https://github.com/Abdullahi-Code9/org-vote-core/actions/workflows/ci.yml/badge.svg)

**Org-Vote** is an open-source Web3 voting and governance engine for organizations, built on the [Stellar](https://stellar.org) network with [Soroban](https://soroban.stellar.org) smart contracts.

Organizations need transparent, tamper-resistant ways to make collective decisions. Org-Vote provides a minimal on-chain polling system where members create polls, cast one vote each, and view live tallies — all secured by Soroban contract logic and signed with a Stellar wallet.

## Features

- **Soroban smart contract** — create polls, cast votes, and read results on-chain
- **One vote per address** — enforced at the contract layer via per-poll voter tracking
- **Next.js frontend** — responsive UI with Freighter wallet integration (with dev mock fallback)
- **Live testnet reads** — polls load from Soroban RPC when `NEXT_PUBLIC_CONTRACT_ID` is set
- **Live results** — bar charts update as votes are cast
- **CI/CD** — GitHub Actions runs frontend lint/build and contract tests on every push

## Directory Structure

```
org-vote-core/
├── .github/workflows/ci.yml  # GitHub Actions CI pipeline
├── app/                      # Next.js App Router pages and global styles
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/               # React UI components
│   ├── PollCard.tsx
│   ├── PollList.tsx
│   ├── ResultsChart.tsx
│   ├── WalletConnect.tsx
│   └── WalletProvider.tsx
├── contracts/                # Soroban smart contract (Rust)
│   ├── Cargo.toml
│   └── src/
│       └── lib.rs
├── lib/                      # Shared frontend utilities
│   ├── config.ts             # Stellar / Soroban env configuration
│   ├── contract.ts           # Soroban RPC client (get_poll)
│   ├── polls.ts              # Mock fallback + vote helpers
│   ├── types.ts
│   └── wallet.ts
├── .env.example              # Environment variable template
├── CONTRIBUTING.md
├── LICENSE
├── package.json
└── README.md
```

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Node.js](https://nodejs.org) | 18+ | Frontend development |
| [Rust](https://rustup.rs) | stable | Soroban contract build |
| [Stellar CLI](https://developers.stellar.org/docs/tools/cli) | latest | Contract deploy & test |
| [Freighter](https://www.freighter.app) | optional | Browser wallet for testnet/mainnet |

## Local Setup

### Frontend

```bash
npm install
cp .env.example .env.local   # optional — enables live testnet reads
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Click **Connect Freighter** to link a wallet (or use the built-in mock connector for local development).

Other scripts:

```bash
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint
```

### Smart Contract

Install the Stellar CLI and add the Soroban target:

```bash
rustup target add wasm32-unknown-unknown
cargo install --locked stellar-cli
```

Build and test the contract:

```bash
cd contracts
cargo test
stellar contract build
```

## Stellar Testnet Deployment

Deploy the Org-Vote contract to Stellar testnet, then wire the frontend to read live poll data.

### 1. Deploy the contract

```bash
cd contracts
stellar contract build

stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/org_vote.wasm \
  --source <YOUR_TESTNET_SECRET_KEY> \
  --network testnet
```

Save the contract ID printed by the deploy command (starts with `C`).

### 2. Configure the frontend

Copy the environment template and set your deployed contract ID:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_CONTRACT_ID=<YOUR_DEPLOYED_CONTRACT_ID>
```

Restart the dev server after changing env vars:

```bash
npm run dev
```

When `NEXT_PUBLIC_CONTRACT_ID` is set, the UI queries the contract via Soroban RPC (`get_poll`). If the RPC call fails or the variable is empty, the app automatically falls back to mock poll data in `lib/polls.ts`.

### 3. Verify on testnet

1. Create a poll via the Stellar CLI or a script calling `create_poll`.
2. Confirm the poll appears in the Org-Vote UI with the **Live testnet data** badge.
3. Cast a vote with a funded testnet account via Freighter.

## Contract API

| Function | Description |
|----------|-------------|
| `create_poll(env, creator, title, options)` | Create a poll with at least two options. Returns poll ID. |
| `cast_vote(env, poll_id, option_index, voter)` | Cast a vote. Reverts if the voter already voted in this poll. |
| `get_poll(env, poll_id)` | Return poll metadata and current vote tallies. |

## Contributing

We welcome contributions from the community, especially during **Drips Wave** sprints. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on opening issues and submitting pull requests.

## License

MIT — see [LICENSE](./LICENSE).

## Links

- [Stellar Developers](https://developers.stellar.org)
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Freighter Wallet](https://www.freighter.app)
