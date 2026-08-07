import WalletConnect from "@/components/WalletConnect";
import PollList from "@/components/PollList";
import { WalletProvider } from "@/components/WalletProvider";

export default function Home() {
  return (
    <WalletProvider>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-stellar">
              Stellar · Soroban
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              Org-Vote
            </h1>
            <p className="mt-3 max-w-xl text-lg text-slate-600">
              Lightweight, transparent governance for organizations — powered by
              Soroban smart contracts on the Stellar network.
            </p>
          </div>
          <WalletConnect />
        </header>

        <PollList />
      </main>
    </WalletProvider>
  );
}
