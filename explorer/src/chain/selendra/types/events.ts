import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v10000 from './v10000'

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
   * Transfer succeeded.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV10000(): {from: Uint8Array, to: Uint8Array, amount: bigint} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class ContractsCodeRemovedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Contracts.CodeRemoved')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A code with the specified hash was removed.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Contracts.CodeRemoved') === '9e5c86c297bd88fae31bc40119e44695818ddc3ab8842b90daeb12771005c70d'
  }

  /**
   * A code with the specified hash was removed.
   */
  get asV10000(): {codeHash: Uint8Array} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class ContractsCodeStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Contracts.CodeStored')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Code with the specified hash has been stored.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Contracts.CodeStored') === '9e5c86c297bd88fae31bc40119e44695818ddc3ab8842b90daeb12771005c70d'
  }

  /**
   * Code with the specified hash has been stored.
   */
  get asV10000(): {codeHash: Uint8Array} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class ContractsContractCodeUpdatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Contracts.ContractCodeUpdated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A contract's code was updated.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Contracts.ContractCodeUpdated') === 'f9de6decda4961d31d7cf59e3f8acd4849a220323ebabbb036464d999de54c18'
  }

  /**
   * A contract's code was updated.
   */
  get asV10000(): {contract: Uint8Array, newCodeHash: Uint8Array, oldCodeHash: Uint8Array} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class ContractsContractEmittedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Contracts.ContractEmitted')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A custom event emitted by the contract.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Contracts.ContractEmitted') === '7f28393268795b9a97f05e82911cdcc4200d99e9968c1ab6a564f949f753b929'
  }

  /**
   * A custom event emitted by the contract.
   */
  get asV10000(): {contract: Uint8Array, data: Uint8Array} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class ContractsInstantiatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Contracts.Instantiated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Contract deployed by address at the specified address.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Contracts.Instantiated') === '20f9f9057a4149f58eb48c00359f9800a42b51d4d2168437dfcce668c27a8d37'
  }

  /**
   * Contract deployed by address at the specified address.
   */
  get asV10000(): {deployer: Uint8Array, contract: Uint8Array} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class ContractsTerminatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Contracts.Terminated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Contract has been removed.
   * 
   * # Note
   * 
   * The only way for a contract to be removed and emitting this event is by calling
   * `seal_terminate`.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Contracts.Terminated') === '8e0b376b4821223ecd835a0ae76a615e7aa14158260ff9c7f87220449d98175b'
  }

  /**
   * Contract has been removed.
   * 
   * # Note
   * 
   * The only way for a contract to be removed and emitting this event is by calling
   * `seal_terminate`.
   */
  get asV10000(): {contract: Uint8Array, beneficiary: Uint8Array} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class EvmLogEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'EVM.Log')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Ethereum events from contracts.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('EVM.Log') === '4edddb5632dcffc943bfbdb42201f95b9c2ffa1df042e526a7c54a39f099056a'
  }

  /**
   * Ethereum events from contracts.
   */
  get asV10000(): {log: v10000.Log} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class EthereumExecutedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Ethereum.Executed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * An ethereum transaction was successfully executed.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Ethereum.Executed') === '4da35f3b1cb63c6084839486f6cc44465f31d4dbf24abce9ef5d05b899d9309e'
  }

  /**
   * An ethereum transaction was successfully executed.
   */
  get asV10000(): {from: Uint8Array, to: Uint8Array, transactionHash: Uint8Array, exitReason: v10000.ExitReason, extraData: Uint8Array} {
    assert(this.isV10000)
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
   * A name was cleared, and the given balance returned.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Identity.IdentityCleared') === '569627bf2a8105e3949fd62dcaae8174fb02f8afedb8e5d8a7fecda5d63b25c3'
  }

  /**
   * A name was cleared, and the given balance returned.
   */
  get asV10000(): {who: Uint8Array, deposit: bigint} {
    assert(this.isV10000)
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
   * A name was removed and the given balance slashed.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Identity.IdentityKilled') === '569627bf2a8105e3949fd62dcaae8174fb02f8afedb8e5d8a7fecda5d63b25c3'
  }

  /**
   * A name was removed and the given balance slashed.
   */
  get asV10000(): {who: Uint8Array, deposit: bigint} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class IdentitySubIdentityRemovedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Identity.SubIdentityRemoved')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A sub-identity was removed from an identity and the deposit freed.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Identity.SubIdentityRemoved') === '3ffe8c1fa99373079f0c7dbda5849194c73c2867fd7ca2b08d19f7c6b676e1ef'
  }

  /**
   * A sub-identity was removed from an identity and the deposit freed.
   */
  get asV10000(): {sub: Uint8Array, main: Uint8Array, deposit: bigint} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}

export class IdentitySubIdentityRevokedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Identity.SubIdentityRevoked')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A sub-identity was cleared, and the given deposit repatriated from the
   * main identity account to the sub-identity account.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Identity.SubIdentityRevoked') === '3ffe8c1fa99373079f0c7dbda5849194c73c2867fd7ca2b08d19f7c6b676e1ef'
  }

  /**
   * A sub-identity was cleared, and the given deposit repatriated from the
   * main identity account to the sub-identity account.
   */
  get asV10000(): {sub: Uint8Array, main: Uint8Array, deposit: bigint} {
    assert(this.isV10000)
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
   * The nominator has been rewarded by this amount.
   */
  get isV10000(): boolean {
    return this._chain.getEventHash('Staking.Rewarded') === '9623d141834cd425342a1ff7a2b2265acd552799bcd6a0df67eb08a661e2215d'
  }

  /**
   * The nominator has been rewarded by this amount.
   */
  get asV10000(): {stash: Uint8Array, amount: bigint} {
    assert(this.isV10000)
    return this._chain.decodeEvent(this.event)
  }
}
