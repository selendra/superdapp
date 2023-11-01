import { UnknownVersionError } from '../../../../utils'
import {
  BalancesTransferEvent,
  BalancesBalanceSetEvent,
  BalancesDepositEvent,
  BalancesEndowedEvent,
  BalancesReserveRepatriatedEvent,
  BalancesReservedEvent,
  BalancesSlashedEvent,
  BalancesUnreservedEvent,
  BalancesWithdrawEvent
} from '../../types/events'
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

const BalanceSet = {
  decode(ctx: ChainContext, event: Event) {
    let e = new BalancesBalanceSetEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const BalancesDeposit = {
  decode(ctx: ChainContext, event: Event) {
    let e = new BalancesDepositEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const BalancesEndowed = {
  decode(ctx: ChainContext, event: Event) {
    let e = new BalancesEndowedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const BalancesReserveRepatriated = {
  decode(ctx: ChainContext, event: Event) {
    let e = new BalancesReserveRepatriatedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const BalancesReserved = {
  decode(ctx: ChainContext, event: Event) {
    let e = new BalancesReservedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const BalancesSlashed = {
  decode(ctx: ChainContext, event: Event) {
    let e = new BalancesSlashedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const BalancesUnreserved = {
  decode(ctx: ChainContext, event: Event) {
    let e = new BalancesUnreservedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const BalancesWithdraw = {
  decode(ctx: ChainContext, event: Event) {
    let e = new BalancesWithdrawEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

export default {
  Transfer,
  BalanceSet,
  BalancesDeposit,
  BalancesEndowed,
  BalancesReserveRepatriated,
  BalancesReserved,
  BalancesSlashed,
  BalancesUnreserved,
  BalancesWithdraw
}
