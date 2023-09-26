import type {Result} from './support'

export type IdentityJudgement = IdentityJudgement_Unknown | IdentityJudgement_FeePaid | IdentityJudgement_Reasonable | IdentityJudgement_KnownGood | IdentityJudgement_OutOfDate | IdentityJudgement_LowQuality | IdentityJudgement_Erroneous

export interface IdentityJudgement_Unknown {
  __kind: 'Unknown'
  value: null
}

export interface IdentityJudgement_FeePaid {
  __kind: 'FeePaid'
  value: bigint
}

export interface IdentityJudgement_Reasonable {
  __kind: 'Reasonable'
  value: null
}

export interface IdentityJudgement_KnownGood {
  __kind: 'KnownGood'
  value: null
}

export interface IdentityJudgement_OutOfDate {
  __kind: 'OutOfDate'
  value: null
}

export interface IdentityJudgement_LowQuality {
  __kind: 'LowQuality'
  value: null
}

export interface IdentityJudgement_Erroneous {
  __kind: 'Erroneous'
  value: null
}

export interface AccountData {
  free: bigint
  reserved: bigint
  miscFrozen: bigint
  feeFrozen: bigint
}

export interface AccountInfo {
  nonce: number
  refcount: number
  data: AccountData
}
