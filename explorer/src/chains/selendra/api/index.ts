export * from './events'
export * from './сalls'

import { ChainApi } from '../../interfaces/chainApi'

import {
    getBalanceSetAccount,
    getDepositAccount,
    getEndowedAccount,
    getIdentityCleared,
    getIdentityKilled,
    getIdentitySubRemoved,
    getIdentitySubRevoked,
    getReserveRepatriatedAccounts,
    getReservedAccount,
    getSlashedAccount,
    getTransferAccounts,
    getUnreservedAccount,
    getWithdrawAccount
} from './events';
import { getBalancesAccountBalances, getSystemAccountBalances, getTotalIssuance } from './storage';

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
        getReserveRepatriatedAccounts,
        getIdentityCleared,
        getIdentityKilled,
        getIdentitySubRemoved,
        getIdentitySubRevoked,
    },
    storage: {
        getBalancesAccountBalances,
        getSystemAccountBalances,
        getTotalIssuance,
    },
}