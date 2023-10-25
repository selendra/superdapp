import { evmToAddress, addressToEvm } from '@polkadot/util-crypto'
import { u8aToHex } from '@polkadot/util'
import { Account } from '../model'
import { getBalances } from '../utils'
import { Action } from './base'
import { ProcessorContext } from '../processor'
import { chain } from '../chain'

interface AccountData {
  id: string,
}

export class EnsureAccount extends Action<AccountData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const balance = await getBalances(ctx, this.block, this.data.id)
    if (!balance) {
      ctx.log.warn('No balances')
      return
    }

    const evmAddress = this.getEvmAddress(this.data.id)

    const account = new Account({
      id: this.data.id,
      freeBalance: balance.free ? balance.free : BigInt(0),
      reservedBalance: balance.reserved ? balance.reserved : BigInt(0),
      totalBalance:
        (balance ? balance.free : BigInt(0)) +
        (balance ? balance.reserved : BigInt(0)),
      updatedAt: this.block.height,
      evmAddress: evmAddress
    })

    await ctx.store.save(account)
  }

  private getEvmAddress(id: string) {
    return u8aToHex(addressToEvm(id, true))
  }
}

interface EvmAccountData {
  item: any
}

export class EnsureEvmAccount extends Action<EvmAccountData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {

    const signer = await this.data.item.event.args.from
    const substrateAddress = this.getSubstrateAddress(signer)

    const balance = await getBalances(ctx, this.block, substrateAddress)
    if (!balance) {
      ctx.log.warn('No balances')
      return
    }

    const account = new Account({
      id: substrateAddress,
      freeBalance: balance.free ? balance.free : BigInt(0),
      reservedBalance: balance.reserved ? balance.reserved : BigInt(0),
      totalBalance:
        (balance ? balance.free : BigInt(0)) +
        (balance ? balance.reserved : BigInt(0)),
      updatedAt: this.block.height,
      evmAddress: signer
    })

    await ctx.store.save(account)
  }

  private getSubstrateAddress(id: string) {
    return evmToAddress(id, chain.config.prefix)
  }
}


