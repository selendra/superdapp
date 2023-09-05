import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v1050 from './v1050'
import * as v2025 from './v2025'
import * as v2028 from './v2028'
import * as v2030 from './v2030'
import * as v9420 from './v9420'

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
   *  The balance of an account.
   * 
   *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
   *  is ever zero, then the entry *MUST* be removed.
   * 
   *  NOTE: This is only used in the case that this module is used to store balances.
   */
  get isV1050() {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
  }

  /**
   *  The balance of an account.
   * 
   *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
   *  is ever zero, then the entry *MUST* be removed.
   * 
   *  NOTE: This is only used in the case that this module is used to store balances.
   */
  async getAsV1050(key: Uint8Array): Promise<v1050.AccountData> {
    assert(this.isV1050)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key)
  }

  async getManyAsV1050(keys: Uint8Array[]): Promise<(v1050.AccountData)[]> {
    assert(this.isV1050)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]))
  }

  async getAllAsV1050(): Promise<(v1050.AccountData)[]> {
    assert(this.isV1050)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account')
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
  get isV9420() {
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
  async getAsV9420(key: Uint8Array): Promise<v9420.AccountData> {
    assert(this.isV9420)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key)
  }

  async getManyAsV9420(keys: Uint8Array[]): Promise<(v9420.AccountData)[]> {
    assert(this.isV9420)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]))
  }

  async getAllAsV9420(): Promise<(v9420.AccountData)[]> {
    assert(this.isV9420)
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
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The total units issued in the system.
   */
  async getAsV1020(): Promise<bigint> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null
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
  get isV1050() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === '2208f857b7cd6fecf78ca393cf3d17ec424773727d0028f07c9f0dc608fc1b7a'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV1050(key: Uint8Array): Promise<v1050.AccountInfo> {
    assert(this.isV1050)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV1050(keys: Uint8Array[]): Promise<(v1050.AccountInfo)[]> {
    assert(this.isV1050)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  async getAllAsV1050(): Promise<(v1050.AccountInfo)[]> {
    assert(this.isV1050)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account')
  }

  /**
   *  The full account information for a particular account ID.
   */
  get isV2025() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === 'eb40f1d91f26d72e29c60e034d53a72b9b529014c7e108f422d8ad5f03f0c902'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV2025(key: Uint8Array): Promise<v2025.AccountInfo> {
    assert(this.isV2025)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV2025(keys: Uint8Array[]): Promise<(v2025.AccountInfo)[]> {
    assert(this.isV2025)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  async getAllAsV2025(): Promise<(v2025.AccountInfo)[]> {
    assert(this.isV2025)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account')
  }

  /**
   *  The full account information for a particular account ID.
   */
  get isV2028() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === '73070b537f1805475b37167271b33ac7fd6ffad8ba62da08bc14937a017b8bb2'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV2028(key: Uint8Array): Promise<v2028.AccountInfo> {
    assert(this.isV2028)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV2028(keys: Uint8Array[]): Promise<(v2028.AccountInfo)[]> {
    assert(this.isV2028)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  async getAllAsV2028(): Promise<(v2028.AccountInfo)[]> {
    assert(this.isV2028)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account')
  }

  /**
   *  The full account information for a particular account ID.
   */
  get isV2030() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV2030(key: Uint8Array): Promise<v2030.AccountInfo> {
    assert(this.isV2030)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV2030(keys: Uint8Array[]): Promise<(v2030.AccountInfo)[]> {
    assert(this.isV2030)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  async getAllAsV2030(): Promise<(v2030.AccountInfo)[]> {
    assert(this.isV2030)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account')
  }

  /**
   *  The full account information for a particular account ID.
   */
  get isV9420() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === 'd6b7a816e0cf6dc8f60cb2bd55c5c5ae7ad928521a6e98aafbe6e954f5c54878'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV9420(key: Uint8Array): Promise<v9420.AccountInfo> {
    assert(this.isV9420)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV9420(keys: Uint8Array[]): Promise<(v9420.AccountInfo)[]> {
    assert(this.isV9420)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  async getAllAsV9420(): Promise<(v9420.AccountInfo)[]> {
    assert(this.isV9420)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Account') != null
  }
}
