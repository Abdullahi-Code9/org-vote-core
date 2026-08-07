export interface Poll {
  id: number;
  title: string;
  options: string[];
  voteCounts: number[];
  creator: string;
}

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
}
