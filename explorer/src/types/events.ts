import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v2008 from './v2008'
import * as v9130 from './v9130'

export class BalancesBalanceSetEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.BalanceSet')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A balance was set by root (who, free, reserved).
   */
  get isV1031(): boolean {
    return this._chain.getEventHash('Balances.BalanceSet') === '0f263bfdefa394edfb38d20d33662423a2e0902235b599f9b2b0292f157f0902'
  }

  /**
   *  A balance was set by root (who, free, reserved).
   */
  get asV1031(): [Uint8Array, bigint, bigint] {
    assert(this.isV1031)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A balance was set by root.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Balances.BalanceSet') === '1e2b5d5a07046e6d6e5507661d3f3feaddfb41fc609a2336b24957322080ca77'
  }

  /**
   * A balance was set by root.
   */
  get asV9130(): {who: Uint8Array, free: bigint, reserved: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A balance was set by root.
   */
  get isV9420(): boolean {
    return this._chain.getEventHash('Balances.BalanceSet') === '8c52e43e845654720e1db5c5bd166f80eb777baf474e93ce4d20fd385601a8fb'
  }

  /**
   * A balance was set by root.
   */
  get asV9420(): {who: Uint8Array, free: bigint} {
    assert(this.isV9420)
    return this._chain.decodeEvent(this.event)
  }
}

export class BalancesDepositEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Deposit')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Some amount was deposited (e.g. for transaction fees).
   */
  get isV1032(): boolean {
    return this._chain.getEventHash('Balances.Deposit') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  Some amount was deposited (e.g. for transaction fees).
   */
  get asV1032(): [Uint8Array, bigint] {
    assert(this.isV1032)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Balances.Deposit') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get asV9130(): {who: Uint8Array, amount: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class BalancesEndowedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Endowed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  An account was created with some free balance.
   */
  get isV1050(): boolean {
    return this._chain.getEventHash('Balances.Endowed') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account was created with some free balance.
   */
  get asV1050(): [Uint8Array, bigint] {
    assert(this.isV1050)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * An account was created with some free balance.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Balances.Endowed') === '75951f685df19cbb5fdda09cf928a105518ceca9576d95bd18d4fac8802730ca'
  }

  /**
   * An account was created with some free balance.
   */
  get asV9130(): {account: Uint8Array, freeBalance: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class BalancesReserveRepatriatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.ReserveRepatriated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Some balance was moved from the reserve of the first account to the second account.
   *  Final argument indicates the destination balance type.
   */
  get isV2008(): boolean {
    return this._chain.getEventHash('Balances.ReserveRepatriated') === '68e9ec5664c8ffe977da0c890bac43122a5cf13565c1c936e2120ba4980bcf31'
  }

  /**
   *  Some balance was moved from the reserve of the first account to the second account.
   *  Final argument indicates the destination balance type.
   */
  get asV2008(): [Uint8Array, Uint8Array, bigint, v2008.BalanceStatus] {
    assert(this.isV2008)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Balances.ReserveRepatriated') === '6232d50d422cea3a6fd21da36387df36d1d366405d0c589566c6de85c9cf541f'
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get asV9130(): {from: Uint8Array, to: Uint8Array, amount: bigint, destinationStatus: v9130.BalanceStatus} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class BalancesReservedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Reserved')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Some balance was reserved (moved from free to reserved).
   */
  get isV2008(): boolean {
    return this._chain.getEventHash('Balances.Reserved') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  Some balance was reserved (moved from free to reserved).
   */
  get asV2008(): [Uint8Array, bigint] {
    assert(this.isV2008)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Balances.Reserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get asV9130(): {who: Uint8Array, amount: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class BalancesSlashedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Slashed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior). \[who,
   * amount_slashed\]
   */
  get isV9122(): boolean {
    return this._chain.getEventHash('Balances.Slashed') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior). \[who,
   * amount_slashed\]
   */
  get asV9122(): [Uint8Array, bigint] {
    assert(this.isV9122)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Balances.Slashed') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get asV9130(): {who: Uint8Array, amount: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class BalancesTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Transfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Transfer succeeded (from, to, value, fees).
   */
  get isV1020(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === '72e6f0d399a72f77551d560f52df25d757e0643d0192b3bc837cbd91b6f36b27'
  }

  /**
   *  Transfer succeeded (from, to, value, fees).
   */
  get asV1020(): [Uint8Array, Uint8Array, bigint, bigint] {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   *  Transfer succeeded (from, to, value).
   */
  get isV1050(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   *  Transfer succeeded (from, to, value).
   */
  get asV1050(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV1050)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV9130(): {from: Uint8Array, to: Uint8Array, amount: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class BalancesUnreservedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Unreserved')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Some balance was unreserved (moved from reserved to free).
   */
  get isV2008(): boolean {
    return this._chain.getEventHash('Balances.Unreserved') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  Some balance was unreserved (moved from reserved to free).
   */
  get asV2008(): [Uint8Array, bigint] {
    assert(this.isV2008)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Balances.Unreserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get asV9130(): {who: Uint8Array, amount: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class BalancesWithdrawEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Withdraw')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
   */
  get isV9122(): boolean {
    return this._chain.getEventHash('Balances.Withdraw') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
   */
  get asV9122(): [Uint8Array, bigint] {
    assert(this.isV9122)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Balances.Withdraw') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get asV9130(): {who: Uint8Array, amount: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}
