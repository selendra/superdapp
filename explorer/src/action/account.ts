import {toHex} from '@subsquid/substrate-processor'
import {Account} from '../model'
import {decodeAddress} from '../utils'
import { Action } from './base'
import { ProcessorContext } from '../processor'

export interface AccountData {
    account: () => Promise<Account | undefined>
    id: string
}

export class EnsureAccount extends Action<AccountData> {
    protected async _perform(ctx: ProcessorContext): Promise<void> {
        let account = await this.data.account()
        if (account != null) return

        account = new Account({
            id: this.data.id,
        })

        await ctx.store.save(account)
    }
}
