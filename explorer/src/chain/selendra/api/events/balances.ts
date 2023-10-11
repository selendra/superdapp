import { UnknownVersionError } from '../../../../utils'
import { BalancesTransferEvent } from '../../types/events'
import { ChainContext, Event } from '../../types/support'

const Transfer = {
  decode(ctx: ChainContext, event: Event) {
    let e = new BalancesTransferEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

export default {
  Transfer
}
