import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v10000 from '../v10000'

export const transfer =  {
    name: 'Balances.Transfer',
    /**
     * Transfer succeeded.
     */
    v10000: new EventType(
        'Balances.Transfer',
        sts.struct({
            from: v10000.AccountId32,
            to: v10000.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
