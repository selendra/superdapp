import {
  ResolvedBalancesEndowedEvent,
  ResolvedBalancesTransferEvent,
  ResolvedBalancesWithdrawEvent,
  ResolvedBalancesReservedEvent,
} from '../../../interfaces/normalised'
import {
  BalancesEndowedEvent,
  BalancesReservedEvent,
  BalancesTransferEvent,
  BalancesWithdrawEvent
} from '../../types/events'

import { encodeId } from '../../../../utils'
import { config } from '../../config'

export class NormalisedBalancesTransferEvent extends BalancesTransferEvent {
  resolve(): ResolvedBalancesTransferEvent {
    if (this.asV1020) {
      return {
        from: encodeId(this.asV1020[0], config.prefix),
        to: encodeId(this.asV1020[1], config.prefix),
        amount: this.asV1020[2]
      }
    } else if (this.asV1050) {
      return {
        from: encodeId(this.asV1050[0], config.prefix),
        to: encodeId(this.asV1050[1], config.prefix),
        amount: this.asV1050[2]
      }
    } else if (this.asV9130) {
      return {
        from: encodeId(this.asV9130.from, config.prefix),
        to: encodeId(this.asV9130.to, config.prefix),
        amount: this.asV9130.amount
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesTransferEvent]'
    )
  }
}

export class NormalisedBalancesEndowedEvent extends BalancesEndowedEvent {
  resolve(): ResolvedBalancesEndowedEvent {
    if (this.isV1050) {
      return {
        account: encodeId(this.asV1050[0], config.prefix),
        freeBalance: this.asV1050[1]
      }
    } else if (this.isV9130) {
      return {
        account: encodeId(this.asV9130.account, config.prefix),
        freeBalance: this.asV9130.freeBalance
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesEndowedEvent]'
    )
  }
}

export class NormalisedBalancesWithdrawEvent extends BalancesWithdrawEvent {
  resolve(): ResolvedBalancesWithdrawEvent {
    if (this.isV9122) {
      return {
        account: encodeId(this.asV9122[0], config.prefix),
        amount: this.asV9122[1]
      }
    } else if (this.isV9130) {
      return {
        account: encodeId(this.asV9130.who, config.prefix),
        amount: this.asV9130.amount
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesWithdrawEvent]'
    )
  }
}

export class NormalisedBalancesReservedEvent extends BalancesReservedEvent {
  resolve(): ResolvedBalancesReservedEvent {
    if (this.isV2008) {
      return {
        account: encodeId(this.asV2008[0], config.prefix),
        amount: this.asV2008[1]
      }
    } else if (this.isV9130) {
      return {
        account: encodeId(this.asV9130.who, config.prefix),
        amount: this.asV9130.amount
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesReservedEvent]'
    )
  }
}
