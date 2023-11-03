import { encodeAddress } from '../utils'
import { chain } from '../chain'
import { Action } from '../action/base'
import { EnsureAccount, RewardAction } from '../action'

export async function process(ctx: any) {
  const actions: Action[] = []

  for (const { items, header } of ctx.blocks) {
    for (const item of items as any) {
      switch (item.name) {
        case 'Staking.Reward':
        case 'Staking.Rewarded': {
          const e = chain.api.events.staking.Rewarded.decode(ctx, item.event)
          if (e == null) return // skip some old format rewards

          let accountId = encodeAddress(e.stash)

          let validatorId: string | undefined
          let era: number | undefined
          if (item.event.call?.name === 'Staking.payout_stakers') {
            const c = chain.api.calls.staking.payout_stakers.decode(
              ctx,
              item.event.call
            )
            validatorId = encodeAddress(c.validatorStash)
            era = c.era
          }

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: accountId
            }),
            new RewardAction(header, item.event.extrinsic, {
              id: item.event.id,
              accountId,
              amount: e.amount,
              era,
              validatorId
            })
          )

          break
        }
      }
    }
  }

  await Action.process(ctx, actions)
}
