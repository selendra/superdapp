import type {Result} from './support'

export interface AccountData {
  free: bigint
  reserved: bigint
  frozen: bigint
  flags: bigint
}

export interface AccountInfo {
  nonce: number
  consumers: number
  providers: number
  sufficients: number
  data: AccountData
}
