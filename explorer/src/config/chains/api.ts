import {UnknownVersionError} from '../../utils/common'
import {ChainApi} from '../interfaces/chainApi'
import {
    BalancesBalanceSetEvent,
    BalancesDepositEvent,
    BalancesEndowedEvent,
    BalancesReserveRepatriatedEvent,
    BalancesReservedEvent,
    BalancesSlashedEvent,
    BalancesTransferEvent,
    BalancesUnreservedEvent,
    BalancesWithdrawEvent,
} from '../../types/events'
import {
    BalancesAccountStorage,
    BalancesTotalIssuanceStorage,
    SystemAccountStorage,
} from '../../types/storage'
import {Block, ChainContext, Event} from '../../types/support'

export function getBalanceSetAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesBalanceSetEvent(ctx, event)

    if (data.isV1031) {
        return data.asV1031[0]
    } else if (data.isV9130) {
        return data.asV9130.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getTransferAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesTransferEvent(ctx, event)

    if (data.isV1020) {
        return [data.asV1020[0], data.asV1020[1]]
    } else if (data.isV1050) {
        return [data.asV1050[0], data.asV1050[1]]
    } else if (data.isV9130) {
        return [data.asV9130.from, data.asV9130.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getEndowedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesEndowedEvent(ctx, event)

    if (data.isV1050) {
        return data.asV1050[0]
    } else if (data.isV9130) {
        return data.asV9130.account
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getDepositAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesDepositEvent(ctx, event)

    if (data.isV1032) {
        return data.asV1032[0]
    } else if (data.isV9130) {
        return data.asV9130.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getReservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesReservedEvent(ctx, event)

    if (data.isV2008) {
        return data.asV2008[0]
    } else if (data.isV9130) {
        return data.asV9130.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getUnreservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesUnreservedEvent(ctx, event)

    if (data.isV2008) {
        return data.asV2008[0]
    } else if (data.isV9130) {
        return data.asV9130.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getWithdrawAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesWithdrawEvent(ctx, event)

    if (data.isV9122) {
        return data.asV9122[0]
    } else if (data.isV9130) {
        return data.asV9130.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getSlashedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesSlashedEvent(ctx, event)

    if (data.isV9122) {
        return data.asV9122[0]
    } else if (data.isV9130) {
        return data.asV9130.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getReserveRepatriatedAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesReserveRepatriatedEvent(ctx, event)

    if (data.isV2008) {
        return [data.asV2008[0], data.asV2008[1]]
    } else if (data.isV9130) {
        return [data.asV9130.from, data.asV9130.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export async function getBalancesAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new BalancesAccountStorage(ctx, block)
    const mapData = (d: {free: bigint; reserved: bigint}) => ({free: d.free, reserved: d.reserved})

    if (storage.isV1050) {
        return storage.getManyAsV1050(accounts).then((data) => data.map(mapData))
    } if (storage.isV9420) {
        return storage.getManyAsV9420(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getSystemAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new SystemAccountStorage(ctx, block)
    if (!storage.isExists) return undefined

    const mapData = (d: {data: {free: bigint; reserved: bigint}}) => ({free: d.data.free, reserved: d.data.reserved})

    if (storage.isV1050) {
        return storage.getManyAsV1050(accounts).then((data) => data.map(mapData))
    } else if (storage.isV2025) {
        return storage.getManyAsV2025(accounts).then((data) => data.map(mapData))
    } else if (storage.isV2028) {
        return storage.getManyAsV2028(accounts).then((data) => data.map(mapData))
    } else if (storage.isV2030) {
        return storage.getManyAsV2030(accounts).then((data) => data.map(mapData))
    }  else if (storage.isV9420) {
        return storage.getManyAsV9420(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getTotalIssuance(ctx: ChainContext, block: Block) {
    const storage = new BalancesTotalIssuanceStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getAsV1020()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

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
    },
    storage: {
        getBalancesAccountBalances,
        getSystemAccountBalances,
        getTotalIssuance,
    },
}