import { UnknownVersionError } from '../../../../utils'
import { EthereumExecutedEvent, EvmLogEvent } from '../../types/events'
import { ChainContext, Event } from '../../types/support'

const EvmExecuted = {
  decode(ctx: ChainContext, event: Event) {
    let e = new EthereumExecutedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const EvmLog = {
    decode(ctx: ChainContext, event: Event) {
      let e = new EvmLogEvent(ctx, event)
      if (e.isV10000) {
        return e.asV10000.log
      } else {
        throw new UnknownVersionError(e)
      }
    }
  }

export default {
    EvmExecuted,
    EvmLog
}
