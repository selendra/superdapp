import {UnknownVersionError} from '../../../../utils'
import {StakingRewardedEvent, StakingRewardEvent} from '../../types/events'
import {ChainContext, Event} from '../../types/support'

const Rewarded = {
    decode(ctx: ChainContext, event: Event) {
        if (event.name === 'Staking.Reward') {
            let e = new StakingRewardEvent(ctx, event)
            if (e.isV1020) {
                return undefined
            } else if (e.isV1050) {
                let [stash, amount] = e.asV1050
                return {stash, amount}
            } else {
                throw new UnknownVersionError(e)
            }
        } else {
            let e = new StakingRewardedEvent(ctx, event)
            if (e.isV9090) {
                return undefined
            } else if (e.isV9090) {
                let [stash, amount] = e.asV9090
                return {stash, amount}
            } else if (e.isV9300) {
                return e.asV9300
            } else {
                throw new UnknownVersionError(e)
            }
        }
    },
}

export default {
    Rewarded,
}
