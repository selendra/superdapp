import {BatchContext, SubstrateBlock} from '@subsquid/substrate-processor'
import {Store} from '@subsquid/typeorm-store'
import {getChainConfig } from '../../config'
import {Account, ChainState} from '../../model'

const { api } = getChainConfig()

const DAY_MS = 24 * 60 * 60 * 1000

export async function saveChainState(ctx: BatchContext<Store, unknown>, block: SubstrateBlock) {
    const state = new ChainState({id: block.id})

    state.timestamp = new Date(getDayTimestamp(block.timestamp))
    state.blockNumber = block.height
    state.tokenBalance = (await api.storage.getTotalIssuance(ctx, block)) || 0n
    state.tokenHolders = await ctx.store.count(Account)

    await ctx.store.save(state)
    ctx.log.child('state').info(`saved at block ${block.height}`)
}

export async function getLastChainState(store: Store) {
    return await store.get(ChainState, {
        where: {},
        order: {
            timestamp: 'DESC',
        },
    })
}

export function isOneDay(timestamp1: number, timestamp2: number) {
    return getDayTimestamp(timestamp1) === getDayTimestamp(timestamp2)
}

function getDayTimestamp(timestamp: number) {
    return Math.floor(timestamp / DAY_MS) * DAY_MS
}

