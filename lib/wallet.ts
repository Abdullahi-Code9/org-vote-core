import type { WalletState } from "./types";

const MOCK_PUBLIC_KEY = "GCKFBEIYTKPGAQQLRGQNE7OXY3H6G5H5QZ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z";

declare global {
  interface Window {
    freighter?: {
      isConnected: () => Promise<boolean>;
      getPublicKey: () => Promise<string>;
      signTransaction: (xdr: string) => Promise<string>;
    };
  }
}

export async function connectFreighter(): Promise<WalletState> {
  if (typeof window === "undefined") {
    return { connected: false, publicKey: null };
  }

  if (window.freighter) {
    const connected = await window.freighter.isConnected();
    if (!connected) {
      throw new Error("Freighter wallet is not connected. Open the extension and approve access.");
    }
    const publicKey = await window.freighter.getPublicKey();
    return { connected: true, publicKey };
  }

  // Mock connector for local development without Freighter installed
  return { connected: true, publicKey: MOCK_PUBLIC_KEY };
}

export async function disconnectFreighter(): Promise<WalletState> {
  return { connected: false, publicKey: null };
}

export function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
