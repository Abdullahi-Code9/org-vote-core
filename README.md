# Org-Vote

**Org-Vote** is an open-source Web3 voting and governance engine for organizations, built on the [Stellar](https://stellar.org) network with [Soroban](https://soroban.stellar.org) smart contracts.

Organizations need transparent, tamper-resistant ways to make collective decisions. Org-Vote provides a minimal on-chain polling system where members create polls, cast one vote each, and view live tallies — all secured by Soroban contract logic and signed with a Stellar wallet.

## Features

- **Soroban smart contract** — create polls, cast votes, and read results on-chain
- **One vote per address** — enforced at the contract layer via per-poll voter tracking
- **Next.js frontend** — responsive UI with Freighter wallet integration (with dev mock fallback)
- **Live results** — bar charts update as votes are cast

## Directory Structure

```
org-vote-core/
├── app/                    # Next.js App Router pages and global styles
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/             # React UI components
│   ├── PollCard.tsx
│   ├── PollList.tsx
│   ├── ResultsChart.tsx
│   ├── WalletConnect.tsx
│   └── WalletProvider.tsx
├── contracts/              # Soroban smart contract (Rust)
│   ├── Cargo.toml
│   └── src/
│       └── lib.rs
├── lib/                    # Shared frontend utilities
│   ├── polls.ts
│   ├── types.ts
│   └── wallet.ts
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

Deploy to Stellar testnet (requires funded account):

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/org_vote.wasm \
  --source <YOUR_SECRET_KEY> \
  --network testnet
```

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
