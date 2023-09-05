import {
    BatchContext,
    BatchProcessorCallItem,
    BatchProcessorEventItem,
    BatchProcessorItem,
    SubstrateBatchProcessor,
    SubstrateBlock,
} from '@subsquid/substrate-processor'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'
import {getChain} from '../chains'
import {isOneDay, saveChainState} from '../chains/chainState'
import {Account, ChainState} from '../model'
import {decodeId, encodeId, getOriginAccountId} from '../utils'

const {api, config} = getChain()

export const processor = new SubstrateBatchProcessor()
    .setDataSource(config.dataSource)
    .setBlockRange(config.blockRange || {from: 0})
    .addEvent('Balances.Endowed', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Transfer', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.BalanceSet', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Reserved', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Unreserved', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.ReserveRepatriated', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Deposit', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Withdraw', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Slashed', {
        data: {event: {args: true}},
    } as const)
    .addCall('*', {
        data: {call: {origin: true}},
    } as const)

type Item = BatchProcessorItem<typeof processor>
type EventItem = BatchProcessorEventItem<typeof processor>
type CallItem = BatchProcessorCallItem<typeof processor>
type Context = BatchContext<Store, Item>

const SAVE_PERIOD = 12 * 60 * 60 * 1000
let lastStateTimestamp: number | undefined

async function getLastChainState(store: Store) {
    return await store.get(ChainState, {
        where: {},
        order: {
            timestamp: 'DESC',
        },
    })
}

export async function processBalances(ctx: Context): Promise<void> {
    const accountIds = new Set<string>()

    if (lastStateTimestamp == null) {
        lastStateTimestamp = (await getLastChainState(ctx.store))?.timestamp.getTime() || 0
    }

    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.kind === 'call') {
                const id = processBalancesCallItem(ctx, item)
                if (id) accountIds.add(id)
            } else if (item.kind === 'event') {
                processBalancesEventItem(ctx, item).forEach((id) => accountIds.add(id))
            }
        }

        if (!isOneDay(lastStateTimestamp, block.header.timestamp)) {
            await saveAccounts(ctx, block.header, [...accountIds])
            await saveChainState(ctx, block.header)

            lastStateTimestamp = block.header.timestamp
            accountIds.clear()
        }
    }

    const block = ctx.blocks[ctx.blocks.length - 1]

    await saveAccounts(ctx, block.header, [...accountIds])
}

async function saveAccounts(ctx: Context, block: SubstrateBlock, accountIds: string[]) {
    const balances = await getBalances(ctx, block, accountIds)
    if (!balances) {
        ctx.log.warn('No balances')
        return
    }

    const accounts = new Map<string, Account>()
    const deletions = new Map<string, Account>()

    for (let i = 0; i < accountIds.length; i++) {
        const id = accountIds[i]
        const balance = balances[i]

        if (!balance) continue
        const total = balance.free + balance.reserved
        if (total > 0n) {
            accounts.set(
                id,
                new Account({
                    id,
                    free: balance.free,
                    reserved: balance.reserved,
                    total,
                    updatedAt: block.height,
                })
            )
        } else {
            deletions.set(id, new Account({id}))
        }
    }

    await ctx.store.save([...accounts.values()])
    ctx.log.child('accounts').info(`updated: ${accounts.size}`)
}

function processBalancesCallItem(ctx: Context, item: CallItem) {
    const id = getOriginAccountId(item.call.origin)
    return id ? encodeId(id, config.prefix) : undefined
}

function processBalancesEventItem(ctx: Context, item: EventItem) {
    const ids: Uint8Array[] = []
    switch (item.name) {
        case 'Balances.BalanceSet': {
            const account = api.events.getBalanceSetAccount(ctx, item.event)
            ids.push(account)
            break
        }
        case 'Balances.Endowed': {
            const account = api.events.getEndowedAccount(ctx, item.event)
            ids.push(account)
            break
        }
        case 'Balances.Deposit': {
            const account = api.events.getDepositAccount(ctx, item.event)
            ids.push(account)
            break
        }
        case 'Balances.Reserved': {
            const account = api.events.getReservedAccount(ctx, item.event)
            ids.push(account)
            break
        }
        case 'Balances.Unreserved': {
            const account = api.events.getUnreservedAccount(ctx, item.event)
            ids.push(account)
            break
        }
        case 'Balances.Withdraw': {
            const account = api.events.getWithdrawAccount(ctx, item.event)
            ids.push(account)
            break
        }
        case 'Balances.Slashed': {
            const account = api.events.getSlashedAccount(ctx, item.event)
            ids.push(account)
            break
        }
        case 'Balances.Transfer': {
            const accounts = api.events.getTransferAccounts(ctx, item.event)
            ids.push(...accounts)
            break
        }
        case 'Balances.ReserveRepatriated': {
            const accounts = api.events.getReserveRepatriatedAccounts(ctx, item.event)
            ids.push(...accounts)
            break
        }
    }
    return ids.map((id) => encodeId(id, config.prefix))
}

interface Balance {
    free: bigint
    reserved: bigint
}

async function getBalances(
    ctx: BatchContext<unknown, unknown>,
    block: SubstrateBlock,
    accountIds: string[]
): Promise<(Balance | undefined)[] | undefined> {
    const accountIdsU8 = [...accountIds].map((id) => decodeId(id, config.prefix))
    return (
        (await api.storage.getSystemAccountBalances(ctx, block, accountIdsU8)) ||
        (await api.storage.getBalancesAccountBalances(ctx, block, accountIdsU8))
    )
}
