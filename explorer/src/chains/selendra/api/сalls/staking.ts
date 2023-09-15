import { UnknownVersionError } from '../../../../utils'
import { StakingPayoutStakersCall } from '../../types/calls'
import { ChainContext, Call } from '../../types/support'

export function callPayoutStakers(ctx: ChainContext, event: Call): {validatorStash: Uint8Array, era: number} {
  let e = new StakingPayoutStakersCall(ctx, event)
  if (e.isV1058) {
    return e.asV1058
  } else {
    throw new UnknownVersionError(e.constructor.name)
  }
}
