import { UnknownVersionError } from '../../../../utils'
import { StakingRewardedEvent } from '../../types/events'
import { ChainContext, Event } from '../../types/support'

const Rewarded = {
  decode(ctx: ChainContext, event: Event) {
    let e = new StakingRewardedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

export default {
  Rewarded
}
