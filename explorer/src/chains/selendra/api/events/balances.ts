import {
  ResolvedBalancesEndowedEvent,
  ResolvedBalancesTransferEvent,
  ResolvedBalancesWithdrawEvent,
  ResolvedBalancesReservedEvent
} from '../../../../interfaces/normalised'
import {
  BalancesEndowedEvent,
  BalancesReservedEvent,
  BalancesTransferEvent,
  BalancesWithdrawEvent
} from '../../types/events'
import { encodeAddress } from '../../../../utils'

export class NormalisedBalancesTransferEvent extends BalancesTransferEvent {
  resolve(): ResolvedBalancesTransferEvent {
    if (this.isV10000) {
      return {
        from: encodeAddress(this.asV10000.from),
        to: encodeAddress(this.asV10000.to),
        amount: this.asV10000.amount
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesTransferEvent]'
    )
  }
}

export class NormalisedBalancesEndowedEvent extends BalancesEndowedEvent {
  resolve(): ResolvedBalancesEndowedEvent {
    if (this.isV10000) {
      return {
        account: encodeAddress(this.asV10000.account),
        freeBalance: this.asV10000.freeBalance
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesEndowedEvent]'
    )
  }
}

export class NormalisedBalancesWithdrawEvent extends BalancesWithdrawEvent {
  resolve(): ResolvedBalancesWithdrawEvent {
    if (this.isV10000) {
      return {
        account: encodeAddress(this.asV10000.who),
        amount: this.asV10000.amount
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesWithdrawEvent]'
    )
  }
}

export class NormalisedBalancesReservedEvent extends BalancesReservedEvent {
  resolve(): ResolvedBalancesReservedEvent {
    if (this.isV10000) {
      return {
        account: encodeAddress(this.asV10000.who),
        amount: this.asV10000.amount
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesReservedEvent]'
    )
  }
}
