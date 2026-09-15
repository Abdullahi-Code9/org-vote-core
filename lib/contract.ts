import {
  Account,
  Contract,
  Networks,
  TransactionBuilder,
  nativeToScVal,
  scValToNative,
} from "@stellar/stellar-sdk";
import { Api as SorobanApi, Server as SorobanServer } from "@stellar/stellar-sdk/rpc";
import type { Poll } from "./types";
import { getStellarConfig } from "./config";

const MAX_POLL_ID = 50;
const SIMULATION_ACCOUNT =
  "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF";

interface ContractPollRaw {
  id: number | bigint;
  title: unknown;
  options: unknown[];
  vote_counts: (number | bigint)[];
  creator: unknown;
}

function networkPassphrase(network: string): string {
  if (network === "mainnet" || network === "public") {
    return Networks.PUBLIC;
  }
  return Networks.TESTNET;
}

function decodeScValString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Uint8Array) {
    return new TextDecoder().decode(value);
  }
  return String(value);
}

function mapContractPoll(raw: ContractPollRaw): Poll {
  return {
    id: Number(raw.id),
    title: decodeScValString(raw.title),
    options: (raw.options ?? []).map(decodeScValString),
    voteCounts: (raw.vote_counts ?? []).map((count) => Number(count)),
    creator: decodeScValString(raw.creator),
  };
}

async function getPollFromContract(
  server: SorobanServer,
  contract: Contract,
  network: string,
  pollId: number
): Promise<Poll | null> {
  const account = new Account(SIMULATION_ACCOUNT, "0");
  const tx = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: networkPassphrase(network),
  })
    .addOperation(
      contract.call("get_poll", nativeToScVal(pollId, { type: "u32" }))
    )
    .setTimeout(30)
    .build();

  const simulation = await server.simulateTransaction(tx);
  if (SorobanApi.isSimulationError(simulation)) {
    return null;
  }
  if (!simulation.result?.retval) {
    return null;
  }

  const raw = scValToNative(simulation.result.retval) as ContractPollRaw;
  return mapContractPoll(raw);
}

export async function fetchPollsFromContract(): Promise<Poll[]> {
  const config = getStellarConfig();
  const server = new SorobanServer(config.rpcUrl);
  const contract = new Contract(config.contractId);

  const polls: Poll[] = [];
  let consecutiveMisses = 0;

  for (let pollId = 1; pollId <= MAX_POLL_ID; pollId++) {
    const poll = await getPollFromContract(
      server,
      contract,
      config.network,
      pollId
    );

    if (poll) {
      polls.push(poll);
      consecutiveMisses = 0;
      continue;
    }

    consecutiveMisses++;
    if (polls.length > 0 && consecutiveMisses >= 3) {
      break;
    }
  }

  if (polls.length === 0) {
    throw new Error("No polls returned from Soroban contract");
  }

  return polls;
}
