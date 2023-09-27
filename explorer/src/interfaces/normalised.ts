import { Weight } from "./handler";

export interface ResolvedContractsCallCall {
  contractAddress: string;
  value?: bigint;
  gasLimit?: Weight;
  storageDepositLimit?: bigint;
  data?: Uint8Array;
}

export interface ResolvedBalancesTransferEvent {
  from: string
  to: string
  amount: bigint
}

export interface ResolvedBalancesEndowedEvent {
  account: string
  freeBalance: bigint
}

export interface ResolvedBalancesWithdrawEvent {
  account: string
  amount: bigint
}

export interface ResolvedNewAccountEvent {
  account: string
}

export interface ResolvedBalancesReservedEvent {
  account: string;
  amount: bigint;
}

export interface AccountData {
  free: bigint
  reserved: bigint
  miscFrozen: bigint
  feeFrozen: bigint
}
export interface ResolvedContractInfoOfStorage {
  trieId: Uint8Array;
  codeHash: Uint8Array;
  storageDeposit?: bigint;
  storageBytes?: number;
  storageItems?: number;
  storageByteDeposit?: bigint;
  storageItemDeposit?: bigint;
  storageBaseDeposit?: bigint;
}