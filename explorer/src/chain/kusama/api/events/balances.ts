import {UnknownVersionError} from '../../../../utils'
import {BalancesTransferEvent} from '../../types/events'
import {ChainContext, Event} from '../../types/support'

const Transfer = {
    decode(ctx: ChainContext, event: Event) {
        let e = new BalancesTransferEvent(ctx, event)
        if (e.isV1020) {
            let [from, to, amount] = e.asV1020
            return {from, to, amount}
        } else if (e.isV1050) {
            let [from, to, amount] = e.asV1050
            return {from, to, amount}
        } else if (e.isV9130) {
            return e.asV9130
        } else {
            throw new UnknownVersionError(e)
        }
    },
}

export default {
    Transfer,
}
