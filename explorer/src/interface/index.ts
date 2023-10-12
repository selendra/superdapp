export interface AccountData {
  id: string
}

export interface BalanceData {
  free: bigint
  reserved: bigint
}

export interface TransferData {
  id: string
  fromId: string
  toId: string
  amount: bigint
  success: boolean
}
