import { Account, StakingReward } from '../../../model'
import { Action } from './base'
import { Context as ActionContext } from '../..'
import { GenericExtrinsic } from '@polkadot/types'
import { AnyTuple } from '@polkadot/types/types'
import {
  SubstrateBlock,
} from '@subsquid/substrate-processor'
import { EventRecord } from '@polkadot/types/interfaces'

export interface RewardData {
  id: string
  amount: bigint
  accountId: string
  block: SubstrateBlock
}

export class RewardAction extends Action<RewardData> {
  protected async _perform(ctx: ActionContext): Promise<void> {
    let validatorId = null
    let era = null

    let account = await ctx.store.get(Account, this.data.accountId)

    let reward = new StakingReward({
      id: this.data.id,
      blockNumber: this.block.height,
      timestamp: new Date(this.block.timestamp),
      extrinsicHash: this.extrinsic?.hash,
      account,
      amount: this.data.amount,
      era: era,
      validatorId: validatorId
    })

    await ctx.store.insert(reward)
  }
}