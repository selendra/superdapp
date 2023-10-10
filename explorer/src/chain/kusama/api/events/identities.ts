import {UnknownVersionError} from '../../../../utils'
import {
    IdentityIdentityClearedEvent,
    IdentityIdentityKilledEvent,
    IdentityIdentitySubRemovedEvent,
    IdentityIdentitySubRevokedEvent,
} from '../../types/events'
import {ChainContext, Event} from '../../types/support'

const IdentityCleared = {
    decode(ctx: ChainContext, event: Event) {
        let e = new IdentityIdentityClearedEvent(ctx, event)
        if (e.isV1030) {
            const [who, deposit] = e.asV1030
            return {who, deposit}
        } else if (e.isV9130) {
            return e.asV9130
        } else {
            throw new UnknownVersionError(e)
        }
    },
}

const IdentityKilled = {
    decode(ctx: ChainContext, event: Event) {
        let e = new IdentityIdentityKilledEvent(ctx, event)
        if (e.isV1030) {
            const [who, deposit] = e.asV1030
            return {who, deposit}
        } else if (e.isV9130) {
            return e.asV9130
        } else {
            throw new UnknownVersionError(e)
        }
    },
}

const IdentitySubRemoved = {
    decode(ctx: ChainContext, event: Event) {
        let e = new IdentityIdentitySubRemovedEvent(ctx, event)
        if (e.isV2015) {
            const [sub, main, deposit] = e.asV2015
            return {sub, main, deposit}
        } else if (e.isV9130) {
            return e.asV9130
        } else {
            throw new UnknownVersionError(e)
        }
    },
}

const IdentitySubRevoked = {
    decode(ctx: ChainContext, event: Event) {
        let e = new IdentityIdentitySubRevokedEvent(ctx, event)
        if (e.isV2015) {
            const [sub, main, deposit] = e.asV2015
            return {sub, main, deposit}
        } else if (e.isV9130) {
            return e.asV9130
        } else {
            throw new UnknownVersionError(e)
        }
    },
}

export default {
    IdentityCleared,
    IdentityKilled,
    IdentitySubRemoved,
    IdentitySubRevoked,
}
