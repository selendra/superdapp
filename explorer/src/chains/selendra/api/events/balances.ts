import { UnknownVersionError } from '../../../../utils'
import {
  BalancesDepositEvent,
  BalancesEndowedEvent,
  BalancesReserveRepatriatedEvent,
  BalancesReservedEvent,
  BalancesSlashedEvent,
  BalancesTransferEvent,
  BalancesUnreservedEvent,
  BalancesWithdrawEvent,
  BalancesBalanceSetEvent
} from '../../types/events'
import { ChainContext, Event } from '../../types/support'

export function getBalanceSetAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesBalanceSetEvent(ctx, event)

  if (data.isV1031) {
    return data.asV1031[0]
  } else if (data.isV9130) {
    return data.asV9130.who
  } else if (data.isV9420) {
    return data.asV9420.who
  } else {
    throw new UnknownVersionError(data.constructor.name)
  }
}

export function getTransferAccounts(
  ctx: ChainContext,
  event: Event
): [Uint8Array, Uint8Array] {
  const data = new BalancesTransferEvent(ctx, event)

  if (data.isV1020) {
    return [data.asV1020[0], data.asV1020[1]]
  } else if (data.isV1050) {
    return [data.asV1050[0], data.asV1050[1]]
  } else if (data.isV9130) {
    return [data.asV9130.from, data.asV9130.to]
  } else {
    throw new UnknownVersionError(data.constructor.name)
  }
}

export function getEndowedAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesEndowedEvent(ctx, event)

  if (data.isV1050) {
    return data.asV1050[0]
  } else if (data.isV9130) {
    return data.asV9130.account
  } else {
    throw new UnknownVersionError(data.constructor.name)
  }
}

export function getDepositAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesDepositEvent(ctx, event)

  if (data.isV1032) {
    return data.asV1032[0]
  } else if (data.isV9130) {
    return data.asV9130.who
  } else {
    throw new UnknownVersionError(data.constructor.name)
  }
}

export function getReservedAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesReservedEvent(ctx, event)

  if (data.isV2008) {
    return data.asV2008[0]
  } else if (data.isV9130) {
    return data.asV9130.who
  } else {
    throw new UnknownVersionError(data.constructor.name)
  }
}

export function getUnreservedAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesUnreservedEvent(ctx, event)

  if (data.isV2008) {
    return data.asV2008[0]
  } else if (data.isV9130) {
    return data.asV9130.who
  } else {
    throw new UnknownVersionError(data.constructor.name)
  }
}

export function getWithdrawAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesWithdrawEvent(ctx, event)

  if (data.isV9122) {
    return data.asV9122[0]
  } else if (data.isV9130) {
    return data.asV9130.who
  } else {
    throw new UnknownVersionError(data.constructor.name)
  }
}

export function getSlashedAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesSlashedEvent(ctx, event)

  if (data.isV9122) {
    return data.asV9122[0]
  } else if (data.isV9130) {
    return data.asV9130.who
  } else {
    throw new UnknownVersionError(data.constructor.name)
  }
}

export function getReserveRepatriatedAccounts(
  ctx: ChainContext,
  event: Event
): [Uint8Array, Uint8Array] {
  const data = new BalancesReserveRepatriatedEvent(ctx, event)

  if (data.isV2008) {
    return [data.asV2008[0], data.asV2008[1]]
  } else if (data.isV9130) {
    return [data.asV9130.from, data.asV9130.to]
  } else {
    throw new UnknownVersionError(data.constructor.name)
  }
}
