"use client";

import { useWallet } from "./WalletProvider";
import { truncateAddress } from "@/lib/wallet";

export default function WalletConnect() {
  const { connected, publicKey, loading, error, connect, disconnect } =
    useWallet();

  return (
    <div className="flex flex-col items-end gap-2">
      {connected && publicKey ? (
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-stellar-muted px-3 py-1 text-sm font-medium text-slate-700">
            {truncateAddress(publicKey)}
          </span>
          <button
            type="button"
            onClick={disconnect}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={connect}
          disabled={loading}
          className="rounded-lg bg-stellar px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stellar-dark disabled:opacity-60"
        >
          {loading ? "Connecting…" : "Connect Freighter"}
        </button>
      )}
      {error && (
        <p className="max-w-xs text-right text-xs text-red-600">{error}</p>
      )}
      {!connected && !error && (
        <p className="max-w-xs text-right text-xs text-slate-500">
          Uses Freighter when available; falls back to a mock wallet in dev.
        </p>
      )}
    </div>
  );
}
