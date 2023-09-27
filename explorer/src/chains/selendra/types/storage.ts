import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v10000 from './v10000'

export class BalancesAccountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The Balances pallet example of storing the balance of an account.
   * 
   *  # Example
   * 
   *  ```nocompile
   *   impl pallet_balances::Config for Runtime {
   *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
   *   }
   *  ```
   * 
   *  You can also store the balance of an account in the `System` pallet.
   * 
   *  # Example
   * 
   *  ```nocompile
   *   impl pallet_balances::Config for Runtime {
   *    type AccountStore = System
   *   }
   *  ```
   * 
   *  But this comes with tradeoffs, storing account balances in the system pallet stores
   *  `frame_system` data alongside the account data contrary to storing account balances in the
   *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
   *  NOTE: This is only used in the case that this pallet is used to store balances.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') === '12d9e780c790f66e9c340b94cabd98da447e1087819d4acb4b1fe22bbb2783fb'
  }

  /**
   *  The Balances pallet example of storing the balance of an account.
   * 
   *  # Example
   * 
   *  ```nocompile
   *   impl pallet_balances::Config for Runtime {
   *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
   *   }
   *  ```
   * 
   *  You can also store the balance of an account in the `System` pallet.
   * 
   *  # Example
   * 
   *  ```nocompile
   *   impl pallet_balances::Config for Runtime {
   *    type AccountStore = System
   *   }
   *  ```
   * 
   *  But this comes with tradeoffs, storing account balances in the system pallet stores
   *  `frame_system` data alongside the account data contrary to storing account balances in the
   *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
   *  NOTE: This is only used in the case that this pallet is used to store balances.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.AccountData> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.AccountData)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.AccountData)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') != null
  }
}

export class BalancesTotalIssuanceStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The total units issued in the system.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The total units issued in the system.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null
  }
}

export class ContractsContractInfoOfStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The code associated with a given account.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Contracts', 'ContractInfoOf') === '2ed3030a48bdd27968f084078d4be8ce85cf8eb4a02dee5baf25409f96c4aa32'
  }

  /**
   *  The code associated with a given account.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.ContractInfo | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Contracts', 'ContractInfoOf', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.ContractInfo | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Contracts', 'ContractInfoOf', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.ContractInfo)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Contracts', 'ContractInfoOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Contracts', 'ContractInfoOf') != null
  }
}

export class SystemAccountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The full account information for a particular account ID.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === 'd6b7a816e0cf6dc8f60cb2bd55c5c5ae7ad928521a6e98aafbe6e954f5c54878'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.AccountInfo> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.AccountInfo)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.AccountInfo)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Account') != null
  }
}
