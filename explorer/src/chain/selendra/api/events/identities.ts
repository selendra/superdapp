import { UnknownVersionError } from '../../../../utils'
import {
  IdentityIdentityClearedEvent,
  IdentityIdentityKilledEvent,
  IdentitySubIdentityRemovedEvent,
  IdentitySubIdentityRevokedEvent
} from '../../types/events'
import { ChainContext, Event } from '../../types/support'

const IdentityCleared = {
  decode(ctx: ChainContext, event: Event) {
    let e = new IdentityIdentityClearedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const IdentityKilled = {
  decode(ctx: ChainContext, event: Event) {
    let e = new IdentityIdentityKilledEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const IdentitySubRemoved = {
  decode(ctx: ChainContext, event: Event) {
    let e = new IdentitySubIdentityRemovedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const IdentitySubRevoked = {
  decode(ctx: ChainContext, event: Event) {
    let e = new IdentitySubIdentityRevokedEvent(ctx, event)
    if (e.isV10000) {
      return e.asV10000
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

export default {
  IdentityCleared,
  IdentityKilled,
  IdentitySubRemoved,
  IdentitySubRevoked
}
