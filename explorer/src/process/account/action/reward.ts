import { Account, StakingReward } from '../../../model'
import { Action } from './base'
import { Context as ActionContext} from '../..'

export interface RewardData {
  id: string
  amount: bigint
  accountId: string
  era?: number
  validatorId?: string
}

export class RewardAction extends Action<RewardData> {
  protected async _perform(ctx: ActionContext): Promise<void> {
    let account = await ctx.store.get(Account, this.data.accountId)

    let reward = new StakingReward({
      id: this.data.id,
      blockNumber: this.block.height,
      timestamp: new Date(this.block.timestamp),
      extrinsicHash: this.extrinsic?.hash,
      account,
      amount: this.data.amount,
      era: this.data.era,
      validatorId: this.data.validatorId
    })

    await ctx.store.insert(reward)
  }
}
