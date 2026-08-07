# 🗳️ Org-Vote Core

![Stellar](https://img.shields.io/badge/Stellar-Mainnet%2FTestnet-blue?style=flat-square&logo=stellar)
![Soroban](https://img.shields.io/badge/Soroban-Rust-orange?style=flat-square&logo=rust)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=flat-square&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> **Org-Vote** is an open-source Web3 voting and governance engine for organizations, built on the Stellar network with Soroban smart contracts.

Organizations need transparent, tamper-resistant ways to make collective decisions. Org-Vote provides a minimal on-chain polling system where members create polls, cast one vote each, and view live tallies — all secured by Soroban contract logic and signed with a Stellar wallet.

---

## ✨ Features

- **Soroban Smart Contract:** Create polls, cast votes, and read results directly on-chain.
- **One Vote Per Address:** Enforced strictly at the contract layer via per-poll voter tracking.
- **Next.js Frontend:** Responsive UI with Freighter wallet integration (includes dev mock fallback).
- **Live Results:** Visual bar charts that update dynamically as votes are cast.
---

## 📂 Directory Structure

```text
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
---

## 🛠️ Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Node.js](https://nodejs.org) | 18+ | Frontend development |
| [Rust](https://rustup.rs) | stable | Soroban contract build |
| [Stellar CLI](https://developers.stellar.org/docs/tools/cli) | latest | Contract deploy & test |
| [Freighter](https://www.freighter.app) | optional | Browser wallet for testnet/mainnet |

---

## 🚀 Local Setup

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
---

## 📜 Contract API Reference

| Function | Parameters | Description |
| :--- | :--- | :--- |
| `create_poll` | `(env, creator, title, options)` | Creates a new poll requiring at least two options. Returns a unique poll ID. |
| `cast_vote` | `(env, poll_id, option_index, voter)` | Casts a vote for an option. Reverts if the voter address has already voted. |
| `get_poll` | `(env, poll_id)` | Fetches poll metadata, options, and current vote tallies. |

---

## 🤝 Contributing

We welcome contributions from the community, especially during **Drips Wave** sprint cycles!

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) guide for details on our workflow, PR standards, and how to claim active sprint issues.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

## 🔗 Resources

- 🌐 [Stellar Developer Documentation](https://developers.stellar.org/)
- ⚙️ [Soroban Smart Contract Docs](https://soroban.stellar.org/)
- 👛 [Freighter Wallet](https://www.freighter.app/)
