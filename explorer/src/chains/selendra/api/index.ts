export * from './events'
export * from './сalls'

import { ChainApi } from '../../interfaces/chainApi'
import {
  getBalanceSetAccount,
  getDepositAccount,
  getEndowedAccount,
  getReserveRepatriatedAccounts,
  getReservedAccount,
  getSlashedAccount,
  getTransferAccounts,
  getUnreservedAccount,
  getWithdrawAccount,
  Transfer,
  IdentityCleared,
  IdentityKilled,
  IdentitySubRemoved,
  IdentitySubRevoked,
  Rewarded
} from './events'

import {
  payout_stakers,
} from './сalls'
import {
  getBalancesAccountBalances,
  getSystemAccountBalances,
  getTotalIssuance
} from './storage'

export const api: ChainApi = {
  events: {
    getBalanceSetAccount,
    getTransferAccounts,
    getEndowedAccount,
    getDepositAccount,
    getReservedAccount,
    getUnreservedAccount,
    getWithdrawAccount,
    getSlashedAccount,
    getReserveRepatriatedAccounts
  },
  storage: {
    getBalancesAccountBalances,
    getSystemAccountBalances,
    getTotalIssuance
  },
  calls: {
    payout_stakers
  }
}
