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