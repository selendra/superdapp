import {
  ResolvedBalancesEndowedEvent,
  ResolvedBalancesTransferEvent,
  ResolvedBalancesWithdrawEvent,
  ResolvedBalancesReservedEvent,
  ResolvedBalancesEvent,
  ResolvedBalancesReserveRepatriatedEvent
} from '../../../../interfaces/normalised'
import {
  BalancesEndowedEvent,
  BalancesReservedEvent,
  BalancesTransferEvent,
  BalancesWithdrawEvent,
  BalancesBalanceSetEvent,
  BalancesDepositEvent,
  BalancesReserveRepatriatedEvent,
  BalancesSlashedEvent,
  BalancesUnreservedEvent
} from '../../types/events'
import { encodeAddress } from '../../../../utils'

export class NormalisedBalancesSetEvent extends BalancesBalanceSetEvent {
  resolve(): ResolvedBalancesEvent {
    if (this.isV10000) {
      return {
        account: encodeAddress(this.asV10000.who),
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesTransferEvent]'
    )
  }
}

export class NormalisedReserveRepatriatedEvent extends BalancesReserveRepatriatedEvent {
  resolve(): ResolvedBalancesReserveRepatriatedEvent {
    if (this.isV10000) {
      return {
        from: encodeAddress(this.asV10000.from),
        to: encodeAddress(this.asV10000.to),
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesTransferEvent]'
    )
  }
}

export class NormalisedBalancesDepositEvent extends BalancesDepositEvent {
  resolve(): ResolvedBalancesEvent {
    if (this.isV10000) {
      return {
        account: encodeAddress(this.asV10000.who),
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesTransferEvent]'
    )
  }
}

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

export class NormalisedBalancesSlashedEvent extends BalancesSlashedEvent {
  resolve(): ResolvedBalancesEvent {
    if (this.isV10000) {
      return {
        account: encodeAddress(this.asV10000.who),
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

export class NormalisedBalancesUnreservedEvent extends BalancesUnreservedEvent {
  resolve(): ResolvedBalancesEvent {
    if (this.isV10000) {
      return {
        account: encodeAddress(this.asV10000.who),
      }
    }
    throw new Error(
      'No runtime version found while decoding [BalancesReservedEvent]'
    )
  }
}