import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'

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

export class IdentityIdentityClearedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Identity.IdentityCleared')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  A name was cleared, and the given balance returned.
     */
    get isV1030(): boolean {
        return this._chain.getEventHash('Identity.IdentityCleared') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    }

    /**
     *  A name was cleared, and the given balance returned.
     */
    get asV1030(): [Uint8Array, bigint] {
        assert(this.isV1030)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A name was cleared, and the given balance returned.
     */
    get isV9130(): boolean {
        return this._chain.getEventHash('Identity.IdentityCleared') === '569627bf2a8105e3949fd62dcaae8174fb02f8afedb8e5d8a7fecda5d63b25c3'
    }

    /**
     * A name was cleared, and the given balance returned.
     */
    get asV9130(): {who: Uint8Array, deposit: bigint} {
        assert(this.isV9130)
        return this._chain.decodeEvent(this.event)
    }
}

export class IdentityIdentityKilledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Identity.IdentityKilled')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  A name was removed and the given balance slashed.
     */
    get isV1030(): boolean {
        return this._chain.getEventHash('Identity.IdentityKilled') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    }

    /**
     *  A name was removed and the given balance slashed.
     */
    get asV1030(): [Uint8Array, bigint] {
        assert(this.isV1030)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A name was removed and the given balance slashed.
     */
    get isV9130(): boolean {
        return this._chain.getEventHash('Identity.IdentityKilled') === '569627bf2a8105e3949fd62dcaae8174fb02f8afedb8e5d8a7fecda5d63b25c3'
    }

    /**
     * A name was removed and the given balance slashed.
     */
    get asV9130(): {who: Uint8Array, deposit: bigint} {
        assert(this.isV9130)
        return this._chain.decodeEvent(this.event)
    }
}

export class IdentityIdentitySubRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Identity.IdentitySubRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  A sub-identity (first) was removed from an identity (second) and the deposit freed.
     */
    get isV2015(): boolean {
        return this._chain.getEventHash('Identity.IdentitySubRemoved') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
    }

    /**
     *  A sub-identity (first) was removed from an identity (second) and the deposit freed.
     */
    get asV2015(): [Uint8Array, Uint8Array, bigint] {
        assert(this.isV2015)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A sub-identity was removed from an identity and the deposit freed.
     */
    get isV9130(): boolean {
        return this._chain.getEventHash('Identity.IdentitySubRemoved') === '3ffe8c1fa99373079f0c7dbda5849194c73c2867fd7ca2b08d19f7c6b676e1ef'
    }

    /**
     * A sub-identity was removed from an identity and the deposit freed.
     */
    get asV9130(): {sub: Uint8Array, main: Uint8Array, deposit: bigint} {
        assert(this.isV9130)
        return this._chain.decodeEvent(this.event)
    }
}

export class IdentityIdentitySubRevokedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Identity.IdentitySubRevoked')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  A sub-identity (first arg) was cleared, and the given deposit repatriated from the
     *  main identity account (second arg) to the sub-identity account.
     */
    get isV2015(): boolean {
        return this._chain.getEventHash('Identity.IdentitySubRevoked') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
    }

    /**
     *  A sub-identity (first arg) was cleared, and the given deposit repatriated from the
     *  main identity account (second arg) to the sub-identity account.
     */
    get asV2015(): [Uint8Array, Uint8Array, bigint] {
        assert(this.isV2015)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A sub-identity was cleared, and the given deposit repatriated from the
     * main identity account to the sub-identity account.
     */
    get isV9130(): boolean {
        return this._chain.getEventHash('Identity.IdentitySubRevoked') === '3ffe8c1fa99373079f0c7dbda5849194c73c2867fd7ca2b08d19f7c6b676e1ef'
    }

    /**
     * A sub-identity was cleared, and the given deposit repatriated from the
     * main identity account to the sub-identity account.
     */
    get asV9130(): {sub: Uint8Array, main: Uint8Array, deposit: bigint} {
        assert(this.isV9130)
        return this._chain.decodeEvent(this.event)
    }
}

export class StakingRewardEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Staking.Reward')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  All validators have been rewarded by the first balance; the second is the remainder
     *  from the maximum amount of reward.
     */
    get isV1020(): boolean {
        return this._chain.getEventHash('Staking.Reward') === 'f7d5bd1431cb954502149f64a8137986d660e0729a3d9731d421496b4298be52'
    }

    /**
     *  All validators have been rewarded by the first balance; the second is the remainder
     *  from the maximum amount of reward.
     */
    get asV1020(): [bigint, bigint] {
        assert(this.isV1020)
        return this._chain.decodeEvent(this.event)
    }

    /**
     *  The staker has been rewarded by this amount. AccountId is controller account.
     */
    get isV1050(): boolean {
        return this._chain.getEventHash('Staking.Reward') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    }

    /**
     *  The staker has been rewarded by this amount. AccountId is controller account.
     */
    get asV1050(): [Uint8Array, bigint] {
        assert(this.isV1050)
        return this._chain.decodeEvent(this.event)
    }
}

export class StakingRewardedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Staking.Rewarded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  The nominator has been rewarded by this amount. \[stash, amount\]
     */
    get isV9090(): boolean {
        return this._chain.getEventHash('Staking.Rewarded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    }

    /**
     *  The nominator has been rewarded by this amount. \[stash, amount\]
     */
    get asV9090(): [Uint8Array, bigint] {
        assert(this.isV9090)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * The nominator has been rewarded by this amount.
     */
    get isV9300(): boolean {
        return this._chain.getEventHash('Staking.Rewarded') === '9623d141834cd425342a1ff7a2b2265acd552799bcd6a0df67eb08a661e2215d'
    }

    /**
     * The nominator has been rewarded by this amount.
     */
    get asV9300(): {stash: Uint8Array, amount: bigint} {
        assert(this.isV9300)
        return this._chain.decodeEvent(this.event)
    }
}
