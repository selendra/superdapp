import { Block, ChainContext, Event } from '../selendra/types/support'

export type ChainApi = {
    events: {
        getBalanceSetAccount: EventGetter<Uint8Array>
        getTransferAccounts: EventGetter<[Uint8Array, Uint8Array]>
        getEndowedAccount: EventGetter<Uint8Array>
        getDepositAccount: EventGetter<Uint8Array>
        getReservedAccount: EventGetter<Uint8Array>
        getUnreservedAccount: EventGetter<Uint8Array>
        getWithdrawAccount: EventGetter<Uint8Array>
        getSlashedAccount: EventGetter<Uint8Array>
        getReserveRepatriatedAccounts: EventGetter<[Uint8Array, Uint8Array]>
    }
    storage: {
        getBalancesAccountBalances: StorageGetter<[Uint8Array[]], BalanceData[] | undefined>
        getSystemAccountBalances: StorageGetter<[Uint8Array[]], BalanceData[] | undefined>
        getTotalIssuance: StorageGetter<[], bigint | undefined>
    }
}

type BalanceData = { free: bigint; reserved: bigint }

type EventGetter<R> = (ctx: ChainContext, event: Event) => R
type StorageGetter<T extends Array<any>, R> = (ctx: ChainContext, block: Block, ...args: T) => Promise<R>
