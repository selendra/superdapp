import {SubstrateBlock, toHex} from '@subsquid/substrate-processor'
import {Account} from '../model'
import {decodeAddress, encodeAddress, getOriginAccountId} from '../utils'
import { Action } from './base'
import { CallItem, ProcessorContext } from '../processor'
import { chain } from "../chain";

export interface AccountData {
    account: () => Promise<Account | undefined>
    id: string
}

export class EnsureAccount extends Action<AccountData> {
    protected async _perform(ctx: ProcessorContext): Promise<void> {
        let account = await this.data.account()
        if (account != null) {}

        account = new Account({
            id: this.data.id,
        })

        await ctx.store.save(account)
    }
}

interface Balance {
    free: bigint
    reserved: bigint
  }

async function getBalances(
    ctx: ProcessorContext,
    block: SubstrateBlock,
    id: string
  ): Promise<(Balance | undefined)[] | undefined> {
    const accountIdsU8 = [decodeAddress(id)]
    return (
      (await chain.api.storages.balances.getSystemAccountBalances.decode(ctx, block, accountIdsU8)) ||
      (await chain.api.storages.balances.getBalancesAccountBalances.decode(ctx, block, accountIdsU8))
    )
  }
  
  export function processBalancesCallItem(item: CallItem) {
    const id = getOriginAccountId(item.call.origin)
    return id ? encodeAddress(id) : undefined
  }