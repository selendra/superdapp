import { Weight } from "./handler";

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

export interface ResolvedBalancesReservedEvent {
  account: string;
  amount: bigint;
}

export interface ResolvedBalancesReserveRepatriatedEvent {
  from: string
  to: string
}

export interface ResolvedNewAccountEvent {
  account: string
}

export interface ResolvedBalancesEvent {
  account: string
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

export interface ResolvedContractsCallCall {
  contractAddress: string;
  value?: bigint;
  gasLimit?: Weight;
  storageDepositLimit?: bigint;
  data?: Uint8Array;
}

export interface ResolvedContractsSetCodeCall {
  contractAddress: string;
  codeHash: string;
}

export interface ResolvedCodeInfoOfStorage {
  owner: Uint8Array
  deposit: bigint
  refcount: bigint
  codeLen: number
}

export interface ResolvedContractsInstantiatedEvent {
  deployer: string;
  contract: string;
}

export interface ResolvedContractCodeRemovedEvent {
  codeHash: string;
}

export interface ResolvedContractsCodeStoredEvent {
  codeHash: string;
}

export interface ResolvedContractsCodeUpdatedEvent {
  contract: string;
  newCodeHash: string;
  oldCodeHash: string;
}

export interface ResolvedContractEmittedEvent {
  contract: string;
  data: Uint8Array;
}

export interface ResolvedContractTerminatedEvent {
  contract: string;
  beneficiary: string;
}