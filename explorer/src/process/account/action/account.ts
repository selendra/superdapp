import { toHex } from '@subsquid/substrate-processor'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { isOneDay, saveChainState } from '../../../chains/chainState'
import { getChain } from '../../../chains'
import { decodeId, encodeId, getOriginAccountId } from '../../../utils'
import { Account, ChainState } from '../../../model'
import { Action } from './base'
import { Context } from '../..'

const { api, config } = getChain()

let lastStateTimestamp: number | undefined

async function getLastChainState(store: Store) {
  return await store.get(ChainState, {
    where: {},
    order: {
      timestamp: 'DESC'
    }
  })
}

export interface AccountData {
  id: string
  block: SubstrateBlock
}

export class EnsureAccount extends Action<AccountData> {
  protected async _perform(ctx: Context): Promise<void> {
    if (lastStateTimestamp == null) {
      lastStateTimestamp =
        (await getLastChainState(ctx.store))?.timestamp.getTime() || 0
    }

    const balances = await getBalances(ctx, this.data.block, this.data.id)
    if (!balances) {
      ctx.log.warn('No balances')
      return
    }

    const balance = balances[0];
    const total = (balance ? balance.free : BigInt(0) ) + (balance ? balance.reserved : BigInt(0))

    const account = new Account({
      id: this.data.id,
      free: balance ? balance.free : BigInt(0),
      reserved: balance ? balance.reserved : BigInt(0),
      total,
      updatedAt: this.data.block.height
    })

    if (!isOneDay(lastStateTimestamp, this.data.block.timestamp)) {
      await saveChainState(ctx, this.data.block)
      lastStateTimestamp =  this.block.timestamp
    }

    await ctx.store.save(account)
  }
}

interface Balance {
  free: bigint
  reserved: bigint
}

async function getBalances(
  ctx: Context,
  block: SubstrateBlock,
  id: string
): Promise<(Balance | undefined)[] | undefined> {
  const accountIdsU8 = [decodeId(id, config.prefix)]
  return (
    (await api.storage.getSystemAccountBalances(ctx, block, accountIdsU8)) ||
    (await api.storage.getBalancesAccountBalances(ctx, block, accountIdsU8))
  )
}
