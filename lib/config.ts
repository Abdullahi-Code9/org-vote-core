export interface StellarConfig {
  network: string;
  rpcUrl: string;
  contractId: string;
}

export function getStellarConfig(): StellarConfig {
  return {
    network: process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "testnet",
    rpcUrl:
      process.env.NEXT_PUBLIC_SOROBAN_RPC_URL ??
      "https://soroban-testnet.stellar.org",
    contractId: process.env.NEXT_PUBLIC_CONTRACT_ID?.trim() ?? "",
  };
}

export function isContractConfigured(): boolean {
  return getStellarConfig().contractId.length > 0;
}
