import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v10000 from './v10000'

export class AssetsAccountStorage {
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
   *  The holdings of a specific account for a specific asset.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Assets', 'Account') === 'c101916616470361869ffc454e1716a26043820583af00df688c1a63340d6f00'
  }

  /**
   *  The holdings of a specific account for a specific asset.
   */
  async getAsV10000(key1: bigint, key2: Uint8Array): Promise<v10000.AssetAccount | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Assets', 'Account', key1, key2)
  }

  async getManyAsV10000(keys: [bigint, Uint8Array][]): Promise<(v10000.AssetAccount | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Assets', 'Account', keys)
  }

  async getAllAsV10000(): Promise<(v10000.AssetAccount)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Assets', 'Account')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Assets', 'Account') != null
  }
}

export class AssetsApprovalsStorage {
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
   *  Approved balance transfers. First balance is the amount approved for transfer. Second
   *  is the amount of `T::Currency` reserved for storing this.
   *  First key is the asset ID, second key is the owner and third key is the delegate.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Assets', 'Approvals') === 'e181a040aa893d48be2d310d45d7896de63efce4a62f2ac85888064719e4bbc6'
  }

  /**
   *  Approved balance transfers. First balance is the amount approved for transfer. Second
   *  is the amount of `T::Currency` reserved for storing this.
   *  First key is the asset ID, second key is the owner and third key is the delegate.
   */
  async getAsV10000(key1: bigint, key2: Uint8Array, key3: Uint8Array): Promise<v10000.Approval | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Assets', 'Approvals', key1, key2, key3)
  }

  async getManyAsV10000(keys: [bigint, Uint8Array, Uint8Array][]): Promise<(v10000.Approval | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Assets', 'Approvals', keys)
  }

  async getAllAsV10000(): Promise<(v10000.Approval)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Assets', 'Approvals')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Assets', 'Approvals') != null
  }
}

export class AssetsAssetStorage {
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
   *  Details of an asset.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Assets', 'Asset') === '725438ae5f03c56c59785767933695c0b6ca519ecc7c8bc7af981c676867483b'
  }

  /**
   *  Details of an asset.
   */
  async getAsV10000(key: bigint): Promise<v10000.AssetDetails | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Assets', 'Asset', key)
  }

  async getManyAsV10000(keys: bigint[]): Promise<(v10000.AssetDetails | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Assets', 'Asset', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.AssetDetails)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Assets', 'Asset')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Assets', 'Asset') != null
  }
}

export class AssetsMetadataStorage {
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
   *  Metadata of an asset.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Assets', 'Metadata') === '61e62fb4641e931b380be1690bd1571bb1c974c2abd9a8958d22bf2a3b91ce05'
  }

  /**
   *  Metadata of an asset.
   */
  async getAsV10000(key: bigint): Promise<v10000.AssetMetadata> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Assets', 'Metadata', key)
  }

  async getManyAsV10000(keys: bigint[]): Promise<(v10000.AssetMetadata)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Assets', 'Metadata', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.AssetMetadata)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Assets', 'Metadata')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Assets', 'Metadata') != null
  }
}

export class AuthorityDiscoveryKeysStorage {
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
   *  Keys of the current authority set.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('AuthorityDiscovery', 'Keys') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  Keys of the current authority set.
   */
  async getAsV10000(): Promise<Uint8Array[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'AuthorityDiscovery', 'Keys')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('AuthorityDiscovery', 'Keys') != null
  }
}

export class AuthorityDiscoveryNextKeysStorage {
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
   *  Keys of the next authority set.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('AuthorityDiscovery', 'NextKeys') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  Keys of the next authority set.
   */
  async getAsV10000(): Promise<Uint8Array[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'AuthorityDiscovery', 'NextKeys')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('AuthorityDiscovery', 'NextKeys') != null
  }
}

export class AuthorshipAuthorStorage {
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
   *  Author of current block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Authorship', 'Author') === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
  }

  /**
   *  Author of current block.
   */
  async getAsV10000(): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Authorship', 'Author')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Authorship', 'Author') != null
  }
}

export class BabeAuthorVrfRandomnessStorage {
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
   *  This field should always be populated during block processing unless
   *  secondary plain slots are enabled (which don't contain a VRF output).
   * 
   *  It is set in `on_finalize`, before it will contain the value from the last block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'AuthorVrfRandomness') === '10a2769b0f42175702ad26b83248cff46d4c3e32ecee58ea6ff2417630585d13'
  }

  /**
   *  This field should always be populated during block processing unless
   *  secondary plain slots are enabled (which don't contain a VRF output).
   * 
   *  It is set in `on_finalize`, before it will contain the value from the last block.
   */
  async getAsV10000(): Promise<(Uint8Array | undefined)> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'AuthorVrfRandomness')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'AuthorVrfRandomness') != null
  }
}

export class BabeAuthoritiesStorage {
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
   *  Current epoch authorities.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'Authorities') === '686332bf745d297ec7d530d6cce5c17119931f5d3c45fd9a96fcad278a9bccb7'
  }

  /**
   *  Current epoch authorities.
   */
  async getAsV10000(): Promise<[Uint8Array, bigint][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'Authorities')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'Authorities') != null
  }
}

export class BabeCurrentSlotStorage {
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
   *  Current slot number.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'CurrentSlot') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  Current slot number.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'CurrentSlot')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'CurrentSlot') != null
  }
}

export class BabeEpochConfigStorage {
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
   *  The configuration for the current epoch. Should never be `None` as it is initialized in
   *  genesis.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'EpochConfig') === '02679d53f6edd683908cd84a1275afad3bb8d1f4b9cb9af0b08cd3d89027b3ef'
  }

  /**
   *  The configuration for the current epoch. Should never be `None` as it is initialized in
   *  genesis.
   */
  async getAsV10000(): Promise<v10000.BabeEpochConfiguration | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'EpochConfig')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'EpochConfig') != null
  }
}

export class BabeEpochIndexStorage {
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
   *  Current epoch index.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'EpochIndex') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  Current epoch index.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'EpochIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'EpochIndex') != null
  }
}

export class BabeEpochStartStorage {
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
   *  The block numbers when the last and current epoch have started, respectively `N-1` and
   *  `N`.
   *  NOTE: We track this is in order to annotate the block number when a given pool of
   *  entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
   *  slots, which may be skipped, the block numbers may not line up with the slot numbers.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'EpochStart') === '21d7691711cd2bd6f3fc4d179c912487bf24c02c8e4e5fd183103936340b5cc5'
  }

  /**
   *  The block numbers when the last and current epoch have started, respectively `N-1` and
   *  `N`.
   *  NOTE: We track this is in order to annotate the block number when a given pool of
   *  entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
   *  slots, which may be skipped, the block numbers may not line up with the slot numbers.
   */
  async getAsV10000(): Promise<[number, number]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'EpochStart')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'EpochStart') != null
  }
}

export class BabeGenesisSlotStorage {
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
   *  The slot at which the first epoch actually started. This is 0
   *  until the first block of the chain.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'GenesisSlot') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  The slot at which the first epoch actually started. This is 0
   *  until the first block of the chain.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'GenesisSlot')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'GenesisSlot') != null
  }
}

export class BabeInitializedStorage {
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
   *  Temporary value (cleared at block finalization) which is `Some`
   *  if per-block initialization has already been called for current block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'Initialized') === 'd640aa265bbc697c1d06e978513ab478b54cefe16a2b8b11b22c93e5a17fb0de'
  }

  /**
   *  Temporary value (cleared at block finalization) which is `Some`
   *  if per-block initialization has already been called for current block.
   */
  async getAsV10000(): Promise<(v10000.PreDigest | undefined) | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'Initialized')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'Initialized') != null
  }
}

export class BabeLatenessStorage {
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
   *  How late the current block is compared to its parent.
   * 
   *  This entry is populated as part of block execution and is cleaned up
   *  on block finalization. Querying this storage entry outside of block
   *  execution context should always yield zero.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'Lateness') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  How late the current block is compared to its parent.
   * 
   *  This entry is populated as part of block execution and is cleaned up
   *  on block finalization. Querying this storage entry outside of block
   *  execution context should always yield zero.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'Lateness')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'Lateness') != null
  }
}

export class BabeNextAuthoritiesStorage {
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
   *  Next epoch authorities.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'NextAuthorities') === '686332bf745d297ec7d530d6cce5c17119931f5d3c45fd9a96fcad278a9bccb7'
  }

  /**
   *  Next epoch authorities.
   */
  async getAsV10000(): Promise<[Uint8Array, bigint][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'NextAuthorities')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'NextAuthorities') != null
  }
}

export class BabeNextEpochConfigStorage {
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
   *  The configuration for the next epoch, `None` if the config will not change
   *  (you can fallback to `EpochConfig` instead in that case).
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'NextEpochConfig') === '02679d53f6edd683908cd84a1275afad3bb8d1f4b9cb9af0b08cd3d89027b3ef'
  }

  /**
   *  The configuration for the next epoch, `None` if the config will not change
   *  (you can fallback to `EpochConfig` instead in that case).
   */
  async getAsV10000(): Promise<v10000.BabeEpochConfiguration | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'NextEpochConfig')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'NextEpochConfig') != null
  }
}

export class BabeNextRandomnessStorage {
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
   *  Next epoch randomness.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'NextRandomness') === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
  }

  /**
   *  Next epoch randomness.
   */
  async getAsV10000(): Promise<Uint8Array> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'NextRandomness')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'NextRandomness') != null
  }
}

export class BabePendingEpochConfigChangeStorage {
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
   *  Pending epoch configuration change that will be applied when the next epoch is enacted.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'PendingEpochConfigChange') === 'f5cc4c82ad97d6c0a6152a4f85104de3d2cb7e03288f50c7291e3d6fd9a88b9c'
  }

  /**
   *  Pending epoch configuration change that will be applied when the next epoch is enacted.
   */
  async getAsV10000(): Promise<v10000.NextConfigDescriptor | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'PendingEpochConfigChange')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'PendingEpochConfigChange') != null
  }
}

export class BabeRandomnessStorage {
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
   *  The epoch randomness for the *current* epoch.
   * 
   *  # Security
   * 
   *  This MUST NOT be used for gambling, as it can be influenced by a
   *  malicious validator in the short term. It MAY be used in many
   *  cryptographic protocols, however, so long as one remembers that this
   *  (like everything else on-chain) it is public. For example, it can be
   *  used where a number is needed that cannot have been chosen by an
   *  adversary, for purposes such as public-coin zero-knowledge proofs.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'Randomness') === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
  }

  /**
   *  The epoch randomness for the *current* epoch.
   * 
   *  # Security
   * 
   *  This MUST NOT be used for gambling, as it can be influenced by a
   *  malicious validator in the short term. It MAY be used in many
   *  cryptographic protocols, however, so long as one remembers that this
   *  (like everything else on-chain) it is public. For example, it can be
   *  used where a number is needed that cannot have been chosen by an
   *  adversary, for purposes such as public-coin zero-knowledge proofs.
   */
  async getAsV10000(): Promise<Uint8Array> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'Randomness')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'Randomness') != null
  }
}

export class BabeSegmentIndexStorage {
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
   *  Randomness under construction.
   * 
   *  We make a trade-off between storage accesses and list length.
   *  We store the under-construction randomness in segments of up to
   *  `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
   * 
   *  Once a segment reaches this length, we begin the next one.
   *  We reset all segments and return to `0` at the beginning of every
   *  epoch.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'SegmentIndex') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Randomness under construction.
   * 
   *  We make a trade-off between storage accesses and list length.
   *  We store the under-construction randomness in segments of up to
   *  `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
   * 
   *  Once a segment reaches this length, we begin the next one.
   *  We reset all segments and return to `0` at the beginning of every
   *  epoch.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'SegmentIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'SegmentIndex') != null
  }
}

export class BabeSkippedEpochsStorage {
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
   *  A list of the last 100 skipped epochs and the corresponding session index
   *  when the epoch was skipped.
   * 
   *  This is only used for validating equivocation proofs. An equivocation proof
   *  must contains a key-ownership proof for a given session, therefore we need a
   *  way to tie together sessions and epoch indices, i.e. we need to validate that
   *  a validator was the owner of a given key on a given session, and what the
   *  active epoch index was during that session.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'SkippedEpochs') === '3df30e4db0015157d5d69bc8676ac0eac9290eba6d0cca73267e7c398c14a688'
  }

  /**
   *  A list of the last 100 skipped epochs and the corresponding session index
   *  when the epoch was skipped.
   * 
   *  This is only used for validating equivocation proofs. An equivocation proof
   *  must contains a key-ownership proof for a given session, therefore we need a
   *  way to tie together sessions and epoch indices, i.e. we need to validate that
   *  a validator was the owner of a given key on a given session, and what the
   *  active epoch index was during that session.
   */
  async getAsV10000(): Promise<[bigint, number][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'SkippedEpochs')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'SkippedEpochs') != null
  }
}

export class BabeUnderConstructionStorage {
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
   *  TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Babe', 'UnderConstruction') === 'f619540cfd39ec62194ccd8c2d0c1c6ffcb39cfc17df25d0e83357e4b6c7d6d5'
  }

  /**
   *  TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
   */
  async getAsV10000(key: number): Promise<Uint8Array[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Babe', 'UnderConstruction', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(Uint8Array[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Babe', 'UnderConstruction', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Babe', 'UnderConstruction')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Babe', 'UnderConstruction') != null
  }
}

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

export class BalancesFreezesStorage {
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
   *  Freeze locks on account balances.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Balances', 'Freezes') === '687d129c824d7b23d1f21a471b19c3fed952e35b64e5de19f549851d1c3f7f91'
  }

  /**
   *  Freeze locks on account balances.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.Type_356[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Freezes', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.Type_356[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Freezes', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.Type_356[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Freezes')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Freezes') != null
  }
}

export class BalancesHoldsStorage {
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
   *  Holds on account balances.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Balances', 'Holds') === 'b978ba6da8d96afd80b2cb26c5769d782b27c5a5b0a41e0e08230a893eb0fc07'
  }

  /**
   *  Holds on account balances.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.IdAmount[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Holds', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.IdAmount[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Holds', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.IdAmount[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Holds')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Holds') != null
  }
}

export class BalancesInactiveIssuanceStorage {
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
   *  The total units of outstanding deactivated balance in the system.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Balances', 'InactiveIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The total units of outstanding deactivated balance in the system.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Balances', 'InactiveIssuance')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'InactiveIssuance') != null
  }
}

export class BalancesLocksStorage {
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
   *  Any liquidity locks on some account balances.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Balances', 'Locks') === 'e393b3a20a6d47aee703c898fda1db02fffe128e4692a5861f416ecc67b13a86'
  }

  /**
   *  Any liquidity locks on some account balances.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.BalanceLock[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Locks', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.BalanceLock[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Locks', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.BalanceLock[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Locks')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Locks') != null
  }
}

export class BalancesReservesStorage {
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
   *  Named reserves on some account balances.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Balances', 'Reserves') === '474ab364918936227f04514c303c572bb070961f30f593f2cbb3e25426aba37a'
  }

  /**
   *  Named reserves on some account balances.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.ReserveData[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Reserves', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.ReserveData[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Reserves', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.ReserveData[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Reserves')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Reserves') != null
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

export class BaseFeeBaseFeePerGasStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('BaseFee', 'BaseFeePerGas') === 'e12d54a636ee6a88656a6ffd53910d80137496224e7ea471959675f994021764'
  }

  async getAsV10000(): Promise<bigint[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'BaseFee', 'BaseFeePerGas')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('BaseFee', 'BaseFeePerGas') != null
  }
}

export class BaseFeeElasticityStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('BaseFee', 'Elasticity') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'BaseFee', 'Elasticity')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('BaseFee', 'Elasticity') != null
  }
}

export class BountiesBountiesStorage {
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
   *  Bounties that have been made.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Bounties', 'Bounties') === '3a079681beba8ee49f179fd6134858f2cef778fb7ad21438c15303b8dda5c6fd'
  }

  /**
   *  Bounties that have been made.
   */
  async getAsV10000(key: number): Promise<v10000.Bounty | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Bounties', 'Bounties', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(v10000.Bounty | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Bounties', 'Bounties', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.Bounty)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Bounties', 'Bounties')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Bounties', 'Bounties') != null
  }
}

export class BountiesBountyApprovalsStorage {
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
   *  Bounty indices that have been approved but not yet funded.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Bounties', 'BountyApprovals') === 'a9f6979e68cec9d5834e7d077129aa05e8b477f326cb009049d2178afbea14f0'
  }

  /**
   *  Bounty indices that have been approved but not yet funded.
   */
  async getAsV10000(): Promise<number[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Bounties', 'BountyApprovals')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Bounties', 'BountyApprovals') != null
  }
}

export class BountiesBountyCountStorage {
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
   *  Number of bounty proposals that have been made.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Bounties', 'BountyCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Number of bounty proposals that have been made.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Bounties', 'BountyCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Bounties', 'BountyCount') != null
  }
}

export class BountiesBountyDescriptionsStorage {
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
   *  The description of each bounty.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Bounties', 'BountyDescriptions') === '8aa11675e28f46f0e4b233018893c1979e42c43f64a290aecd81221cbc7f6e92'
  }

  /**
   *  The description of each bounty.
   */
  async getAsV10000(key: number): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Bounties', 'BountyDescriptions', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Bounties', 'BountyDescriptions', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Bounties', 'BountyDescriptions')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Bounties', 'BountyDescriptions') != null
  }
}

export class ChildBountiesChildBountiesStorage {
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
   *  Child bounties that have been added.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ChildBounties') === '27265a54e9a270a9e783aa4baa7a1318433a77722a99de466a3afe5e9d56ba7d'
  }

  /**
   *  Child bounties that have been added.
   */
  async getAsV10000(key1: number, key2: number): Promise<v10000.ChildBounty | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ChildBounties', 'ChildBounties', key1, key2)
  }

  async getManyAsV10000(keys: [number, number][]): Promise<(v10000.ChildBounty | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ChildBounties', 'ChildBounties', keys)
  }

  async getAllAsV10000(): Promise<(v10000.ChildBounty)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ChildBounties', 'ChildBounties')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ChildBounties') != null
  }
}

export class ChildBountiesChildBountyCountStorage {
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
   *  Number of total child bounties.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ChildBountyCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Number of total child bounties.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ChildBounties', 'ChildBountyCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ChildBountyCount') != null
  }
}

export class ChildBountiesChildBountyDescriptionsStorage {
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
   *  The description of each child-bounty.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ChildBountyDescriptions') === '8aa11675e28f46f0e4b233018893c1979e42c43f64a290aecd81221cbc7f6e92'
  }

  /**
   *  The description of each child-bounty.
   */
  async getAsV10000(key: number): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ChildBounties', 'ChildBountyDescriptions', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ChildBounties', 'ChildBountyDescriptions', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ChildBounties', 'ChildBountyDescriptions')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ChildBountyDescriptions') != null
  }
}

export class ChildBountiesChildrenCuratorFeesStorage {
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
   *  The cumulative child-bounty curator fee for each parent bounty.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ChildrenCuratorFees') === 'd4b0e776f9f1d19233fe32cd062ab41a912af3d15ceb9d02d9ebc8fbe7b1cda4'
  }

  /**
   *  The cumulative child-bounty curator fee for each parent bounty.
   */
  async getAsV10000(key: number): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ChildBounties', 'ChildrenCuratorFees', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(bigint)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ChildBounties', 'ChildrenCuratorFees', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(bigint)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ChildBounties', 'ChildrenCuratorFees')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ChildrenCuratorFees') != null
  }
}

export class ChildBountiesParentChildBountiesStorage {
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
   *  Number of child bounties per parent bounty.
   *  Map of parent bounty index to number of child bounties.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ParentChildBounties') === 'be37cd27c0e60862618e14817365ea9f5c3c45854fea63a6259de44af2521364'
  }

  /**
   *  Number of child bounties per parent bounty.
   *  Map of parent bounty index to number of child bounties.
   */
  async getAsV10000(key: number): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ChildBounties', 'ParentChildBounties', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(number)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ChildBounties', 'ParentChildBounties', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(number)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ChildBounties', 'ParentChildBounties')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ChildBounties', 'ParentChildBounties') != null
  }
}

export class ContractsCodeInfoOfStorage {
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
   *  A mapping from a contract's code hash to its code info.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Contracts', 'CodeInfoOf') === '14afed0b78ca8603cba6db022558f6c0e9aabac216a6a3b3853ff20ac62f41b8'
  }

  /**
   *  A mapping from a contract's code hash to its code info.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.CodeInfo | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Contracts', 'CodeInfoOf', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.CodeInfo | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Contracts', 'CodeInfoOf', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.CodeInfo)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Contracts', 'CodeInfoOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Contracts', 'CodeInfoOf') != null
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

export class ContractsDeletionQueueStorage {
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
   *  Evicted contracts that await child trie deletion.
   * 
   *  Child trie deletion is a heavy operation depending on the amount of storage items
   *  stored in said trie. Therefore this operation is performed lazily in `on_idle`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Contracts', 'DeletionQueue') === '8aa11675e28f46f0e4b233018893c1979e42c43f64a290aecd81221cbc7f6e92'
  }

  /**
   *  Evicted contracts that await child trie deletion.
   * 
   *  Child trie deletion is a heavy operation depending on the amount of storage items
   *  stored in said trie. Therefore this operation is performed lazily in `on_idle`.
   */
  async getAsV10000(key: number): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Contracts', 'DeletionQueue', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Contracts', 'DeletionQueue', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Contracts', 'DeletionQueue')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Contracts', 'DeletionQueue') != null
  }
}

export class ContractsDeletionQueueCounterStorage {
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
   *  A pair of monotonic counters used to track the latest contract marked for deletion
   *  and the latest deleted contract in queue.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Contracts', 'DeletionQueueCounter') === '65d5c1dade2675e2cfc8b3bec1aea2c072e986624721f7e36114b12902e231a0'
  }

  /**
   *  A pair of monotonic counters used to track the latest contract marked for deletion
   *  and the latest deleted contract in queue.
   */
  async getAsV10000(): Promise<v10000.DeletionQueueManager> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Contracts', 'DeletionQueueCounter')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Contracts', 'DeletionQueueCounter') != null
  }
}

export class ContractsMigrationInProgressStorage {
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
   *  A migration can span across multiple blocks. This storage defines a cursor to track the
   *  progress of the migration, enabling us to resume from the last completed position.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Contracts', 'MigrationInProgress') === '9d37db61fb40fc6c377391f52a7b349395407634d45b47a8943ab5ccf47e31e4'
  }

  /**
   *  A migration can span across multiple blocks. This storage defines a cursor to track the
   *  progress of the migration, enabling us to resume from the last completed position.
   */
  async getAsV10000(): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Contracts', 'MigrationInProgress')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Contracts', 'MigrationInProgress') != null
  }
}

export class ContractsNonceStorage {
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
   *  This is a **monotonic** counter incremented on contract instantiation.
   * 
   *  This is used in order to generate unique trie ids for contracts.
   *  The trie id of a new contract is calculated from hash(account_id, nonce).
   *  The nonce is required because otherwise the following sequence would lead to
   *  a possible collision of storage:
   * 
   *  1. Create a new contract.
   *  2. Terminate the contract.
   *  3. Immediately recreate the contract with the same account_id.
   * 
   *  This is bad because the contents of a trie are deleted lazily and there might be
   *  storage of the old instantiation still in it when the new contract is created. Please
   *  note that we can't replace the counter by the block number because the sequence above
   *  can happen in the same block. We also can't keep the account counter in memory only
   *  because storage is the only way to communicate across different extrinsics in the
   *  same block.
   * 
   *  # Note
   * 
   *  Do not use it to determine the number of contracts. It won't be decremented if
   *  a contract is destroyed.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Contracts', 'Nonce') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  This is a **monotonic** counter incremented on contract instantiation.
   * 
   *  This is used in order to generate unique trie ids for contracts.
   *  The trie id of a new contract is calculated from hash(account_id, nonce).
   *  The nonce is required because otherwise the following sequence would lead to
   *  a possible collision of storage:
   * 
   *  1. Create a new contract.
   *  2. Terminate the contract.
   *  3. Immediately recreate the contract with the same account_id.
   * 
   *  This is bad because the contents of a trie are deleted lazily and there might be
   *  storage of the old instantiation still in it when the new contract is created. Please
   *  note that we can't replace the counter by the block number because the sequence above
   *  can happen in the same block. We also can't keep the account counter in memory only
   *  because storage is the only way to communicate across different extrinsics in the
   *  same block.
   * 
   *  # Note
   * 
   *  Do not use it to determine the number of contracts. It won't be decremented if
   *  a contract is destroyed.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Contracts', 'Nonce')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Contracts', 'Nonce') != null
  }
}

export class ContractsPristineCodeStorage {
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
   *  A mapping from a contract's code hash to its code.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Contracts', 'PristineCode') === '2c57d2b4da44b4d6783b1eb7d03f42f23490455080a2c71c813169067dfe1a54'
  }

  /**
   *  A mapping from a contract's code hash to its code.
   */
  async getAsV10000(key: Uint8Array): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Contracts', 'PristineCode', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Contracts', 'PristineCode', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Contracts', 'PristineCode')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Contracts', 'PristineCode') != null
  }
}

export class ConvictionVotingClassLocksForStorage {
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
   *  The voting classes which have a non-zero lock requirement and the lock amounts which they
   *  require. The actual amount locked on behalf of this pallet should always be the maximum of
   *  this list.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ConvictionVoting', 'ClassLocksFor') === '82641f40f081979db4386ae71b3895881f193f9a8e6fe1a5537661ac52af877c'
  }

  /**
   *  The voting classes which have a non-zero lock requirement and the lock amounts which they
   *  require. The actual amount locked on behalf of this pallet should always be the maximum of
   *  this list.
   */
  async getAsV10000(key: Uint8Array): Promise<[number, bigint][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ConvictionVoting', 'ClassLocksFor', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<([number, bigint][])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ConvictionVoting', 'ClassLocksFor', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([number, bigint][])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ConvictionVoting', 'ClassLocksFor')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ConvictionVoting', 'ClassLocksFor') != null
  }
}

export class ConvictionVotingVotingForStorage {
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
   *  All voting for a particular voter in a particular voting class. We store the balance for the
   *  number of votes that we have recorded.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ConvictionVoting', 'VotingFor') === 'df291b3d7624eee0e92994a913b5e2134fd7795d7b03d5af2a82d38f2d2e4fd7'
  }

  /**
   *  All voting for a particular voter in a particular voting class. We store the balance for the
   *  number of votes that we have recorded.
   */
  async getAsV10000(key1: Uint8Array, key2: number): Promise<v10000.Voting> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ConvictionVoting', 'VotingFor', key1, key2)
  }

  async getManyAsV10000(keys: [Uint8Array, number][]): Promise<(v10000.Voting)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ConvictionVoting', 'VotingFor', keys)
  }

  async getAllAsV10000(): Promise<(v10000.Voting)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ConvictionVoting', 'VotingFor')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ConvictionVoting', 'VotingFor') != null
  }
}

export class EVMAccountCodesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('EVM', 'AccountCodes') === '4b802a732c8f27bcaa64a64c00c70aeccf7b09e63cd3db9000de1ada8ab379c2'
  }

  async getAsV10000(key: Uint8Array): Promise<Uint8Array> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'EVM', 'AccountCodes', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'EVM', 'AccountCodes', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'EVM', 'AccountCodes')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('EVM', 'AccountCodes') != null
  }
}

export class EVMAccountCodesMetadataStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('EVM', 'AccountCodesMetadata') === '85b2848eb820c708bd1d2c8e96a947d7f7597fba6d42d560a793758fc63f060e'
  }

  async getAsV10000(key: Uint8Array): Promise<v10000.CodeMetadata | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'EVM', 'AccountCodesMetadata', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.CodeMetadata | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'EVM', 'AccountCodesMetadata', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.CodeMetadata)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'EVM', 'AccountCodesMetadata')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('EVM', 'AccountCodesMetadata') != null
  }
}

export class EVMAccountStoragesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('EVM', 'AccountStorages') === 'e46b64a08590ade9974d6cacb482b7b117daf13fb4b1c7e4a0c1e141c3c7c76f'
  }

  async getAsV10000(key1: Uint8Array, key2: Uint8Array): Promise<Uint8Array> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'EVM', 'AccountStorages', key1, key2)
  }

  async getManyAsV10000(keys: [Uint8Array, Uint8Array][]): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'EVM', 'AccountStorages', keys)
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'EVM', 'AccountStorages')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('EVM', 'AccountStorages') != null
  }
}

export class ElectionProviderMultiPhaseCurrentPhaseStorage {
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
   *  Current phase.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'CurrentPhase') === 'd43c46e1fdaabf223f7ddc55f3636b227c163ebca9bccdb6f6aca606816cba64'
  }

  /**
   *  Current phase.
   */
  async getAsV10000(): Promise<v10000.Phase> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'CurrentPhase')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'CurrentPhase') != null
  }
}

export class ElectionProviderMultiPhaseDesiredTargetsStorage {
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
   *  Desired number of targets to elect for this round.
   * 
   *  Only exists when [`Snapshot`] is present.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'DesiredTargets') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Desired number of targets to elect for this round.
   * 
   *  Only exists when [`Snapshot`] is present.
   */
  async getAsV10000(): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'DesiredTargets')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'DesiredTargets') != null
  }
}

export class ElectionProviderMultiPhaseMinimumUntrustedScoreStorage {
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
   *  The minimum score that each 'untrusted' solution must attain in order to be considered
   *  feasible.
   * 
   *  Can be set via `set_minimum_untrusted_score`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'MinimumUntrustedScore') === '54808e3ff7550c21d1fb18cb6c67f1e6942e127345058749baa91d8c1651bd60'
  }

  /**
   *  The minimum score that each 'untrusted' solution must attain in order to be considered
   *  feasible.
   * 
   *  Can be set via `set_minimum_untrusted_score`.
   */
  async getAsV10000(): Promise<v10000.ElectionScore | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'MinimumUntrustedScore')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'MinimumUntrustedScore') != null
  }
}

export class ElectionProviderMultiPhaseQueuedSolutionStorage {
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
   *  Current best solution, signed or unsigned, queued to be returned upon `elect`.
   * 
   *  Always sorted by score.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'QueuedSolution') === 'cf8250c7935545f78c3fca062506caaa5d94dab6e6950381bca2b336b9f8876e'
  }

  /**
   *  Current best solution, signed or unsigned, queued to be returned upon `elect`.
   * 
   *  Always sorted by score.
   */
  async getAsV10000(): Promise<v10000.ReadySolution | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'QueuedSolution')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'QueuedSolution') != null
  }
}

export class ElectionProviderMultiPhaseRoundStorage {
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
   *  Internal counter for the number of rounds.
   * 
   *  This is useful for de-duplication of transactions submitted to the pool, and general
   *  diagnostics of the pallet.
   * 
   *  This is merely incremented once per every time that an upstream `elect` is called.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'Round') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Internal counter for the number of rounds.
   * 
   *  This is useful for de-duplication of transactions submitted to the pool, and general
   *  diagnostics of the pallet.
   * 
   *  This is merely incremented once per every time that an upstream `elect` is called.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'Round')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'Round') != null
  }
}

export class ElectionProviderMultiPhaseSignedSubmissionIndicesStorage {
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
   *  A sorted, bounded vector of `(score, block_number, index)`, where each `index` points to a
   *  value in `SignedSubmissions`.
   * 
   *  We never need to process more than a single signed submission at a time. Signed submissions
   *  can be quite large, so we're willing to pay the cost of multiple database accesses to access
   *  them one at a time instead of reading and decoding all of them at once.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'SignedSubmissionIndices') === 'aecbdca3369396b8f7ae7da45a210e0b48c62258a15e0f7c1a7cb29c941f666c'
  }

  /**
   *  A sorted, bounded vector of `(score, block_number, index)`, where each `index` points to a
   *  value in `SignedSubmissions`.
   * 
   *  We never need to process more than a single signed submission at a time. Signed submissions
   *  can be quite large, so we're willing to pay the cost of multiple database accesses to access
   *  them one at a time instead of reading and decoding all of them at once.
   */
  async getAsV10000(): Promise<[v10000.ElectionScore, number, number][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'SignedSubmissionIndices')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'SignedSubmissionIndices') != null
  }
}

export class ElectionProviderMultiPhaseSignedSubmissionNextIndexStorage {
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
   *  The next index to be assigned to an incoming signed submission.
   * 
   *  Every accepted submission is assigned a unique index; that index is bound to that particular
   *  submission for the duration of the election. On election finalization, the next index is
   *  reset to 0.
   * 
   *  We can't just use `SignedSubmissionIndices.len()`, because that's a bounded set; past its
   *  capacity, it will simply saturate. We can't just iterate over `SignedSubmissionsMap`,
   *  because iteration is slow. Instead, we store the value here.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'SignedSubmissionNextIndex') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The next index to be assigned to an incoming signed submission.
   * 
   *  Every accepted submission is assigned a unique index; that index is bound to that particular
   *  submission for the duration of the election. On election finalization, the next index is
   *  reset to 0.
   * 
   *  We can't just use `SignedSubmissionIndices.len()`, because that's a bounded set; past its
   *  capacity, it will simply saturate. We can't just iterate over `SignedSubmissionsMap`,
   *  because iteration is slow. Instead, we store the value here.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'SignedSubmissionNextIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'SignedSubmissionNextIndex') != null
  }
}

export class ElectionProviderMultiPhaseSignedSubmissionsMapStorage {
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
   *  Unchecked, signed solutions.
   * 
   *  Together with `SubmissionIndices`, this stores a bounded set of `SignedSubmissions` while
   *  allowing us to keep only a single one in memory at a time.
   * 
   *  Twox note: the key of the map is an auto-incrementing index which users cannot inspect or
   *  affect; we shouldn't need a cryptographically secure hasher.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'SignedSubmissionsMap') === '0bdd7939a257877febf5ab7215f0cc9cfa33db8610c6c8a3d48cb0f3cb8c7219'
  }

  /**
   *  Unchecked, signed solutions.
   * 
   *  Together with `SubmissionIndices`, this stores a bounded set of `SignedSubmissions` while
   *  allowing us to keep only a single one in memory at a time.
   * 
   *  Twox note: the key of the map is an auto-incrementing index which users cannot inspect or
   *  affect; we shouldn't need a cryptographically secure hasher.
   */
  async getAsV10000(key: number): Promise<v10000.SignedSubmission | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'SignedSubmissionsMap', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(v10000.SignedSubmission | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ElectionProviderMultiPhase', 'SignedSubmissionsMap', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.SignedSubmission)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ElectionProviderMultiPhase', 'SignedSubmissionsMap')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'SignedSubmissionsMap') != null
  }
}

export class ElectionProviderMultiPhaseSnapshotStorage {
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
   *  Snapshot data of the round.
   * 
   *  This is created at the beginning of the signed phase and cleared upon calling `elect`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'Snapshot') === '0a57d7483519dd2d24b03dc8b9cb8e5dd9fde6a07e5c2d586f430184184c3b75'
  }

  /**
   *  Snapshot data of the round.
   * 
   *  This is created at the beginning of the signed phase and cleared upon calling `elect`.
   */
  async getAsV10000(): Promise<v10000.RoundSnapshot | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'Snapshot')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'Snapshot') != null
  }
}

export class ElectionProviderMultiPhaseSnapshotMetadataStorage {
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
   *  The metadata of the [`RoundSnapshot`]
   * 
   *  Only exists when [`Snapshot`] is present.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'SnapshotMetadata') === '4bc67c3d694c467e93d2d551db48f7b2d0497a44b4acaecfdc842a49ce699da7'
  }

  /**
   *  The metadata of the [`RoundSnapshot`]
   * 
   *  Only exists when [`Snapshot`] is present.
   */
  async getAsV10000(): Promise<v10000.SolutionOrSnapshotSize | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'SnapshotMetadata')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'SnapshotMetadata') != null
  }
}

export class EthereumBlockHashStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('Ethereum', 'BlockHash') === 'd109a5bfe3c0dddfa78068361c6dcb87a104c8df51fa8ceaa0e54ad3bedab8d4'
  }

  async getAsV10000(key: bigint[]): Promise<Uint8Array> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Ethereum', 'BlockHash', key)
  }

  async getManyAsV10000(keys: bigint[][]): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Ethereum', 'BlockHash', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Ethereum', 'BlockHash')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Ethereum', 'BlockHash') != null
  }
}

export class EthereumCurrentBlockStorage {
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
   *  The current Ethereum block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Ethereum', 'CurrentBlock') === '557f002e64a7a02acc455da7da6fbb5ef3003df67793ab8f9702bcda6d0a72be'
  }

  /**
   *  The current Ethereum block.
   */
  async getAsV10000(): Promise<v10000.Block | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Ethereum', 'CurrentBlock')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Ethereum', 'CurrentBlock') != null
  }
}

export class EthereumCurrentReceiptsStorage {
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
   *  The current Ethereum receipts.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Ethereum', 'CurrentReceipts') === '850c7e122ca788e459cf4014e499c9ccf142aa3995e88065ed4e99c04cf05934'
  }

  /**
   *  The current Ethereum receipts.
   */
  async getAsV10000(): Promise<v10000.ReceiptV3[] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Ethereum', 'CurrentReceipts')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Ethereum', 'CurrentReceipts') != null
  }
}

export class EthereumCurrentTransactionStatusesStorage {
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
   *  The current transaction statuses.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Ethereum', 'CurrentTransactionStatuses') === 'e42d9c1a7dbca2e4e0301367b0c021b885fe9bf9ce8eadadb8b48112a96cf49e'
  }

  /**
   *  The current transaction statuses.
   */
  async getAsV10000(): Promise<v10000.TransactionStatus[] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Ethereum', 'CurrentTransactionStatuses')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Ethereum', 'CurrentTransactionStatuses') != null
  }
}

export class EthereumPendingStorage {
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
   *  Current building block's transactions and receipts.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Ethereum', 'Pending') === '481954b3b9b7a4a1aee782aee254aff26561db9d045ab0f9f1807f9c11cb3848'
  }

  /**
   *  Current building block's transactions and receipts.
   */
  async getAsV10000(): Promise<[v10000.TransactionV2, v10000.TransactionStatus, v10000.ReceiptV3][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Ethereum', 'Pending')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Ethereum', 'Pending') != null
  }
}

export class FastUnstakeCounterForQueueStorage {
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
   * Counter for the related counted storage map
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('FastUnstake', 'CounterForQueue') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   * Counter for the related counted storage map
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'FastUnstake', 'CounterForQueue')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('FastUnstake', 'CounterForQueue') != null
  }
}

export class FastUnstakeErasToCheckPerBlockStorage {
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
   *  Number of eras to check per block.
   * 
   *  If set to 0, this pallet does absolutely nothing. Cannot be set to more than
   *  [`Config::MaxErasToCheckPerBlock`].
   * 
   *  Based on the amount of weight available at [`Pallet::on_idle`], up to this many eras are
   *  checked. The checking is represented by updating [`UnstakeRequest::checked`], which is
   *  stored in [`Head`].
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('FastUnstake', 'ErasToCheckPerBlock') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Number of eras to check per block.
   * 
   *  If set to 0, this pallet does absolutely nothing. Cannot be set to more than
   *  [`Config::MaxErasToCheckPerBlock`].
   * 
   *  Based on the amount of weight available at [`Pallet::on_idle`], up to this many eras are
   *  checked. The checking is represented by updating [`UnstakeRequest::checked`], which is
   *  stored in [`Head`].
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'FastUnstake', 'ErasToCheckPerBlock')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('FastUnstake', 'ErasToCheckPerBlock') != null
  }
}

export class FastUnstakeHeadStorage {
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
   *  The current "head of the queue" being unstaked.
   * 
   *  The head in itself can be a batch of up to [`Config::BatchSize`] stakers.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('FastUnstake', 'Head') === '53adfbb7f77e458b9628e98623c2b4f4eb2804878ca690d531d2e10861e2f759'
  }

  /**
   *  The current "head of the queue" being unstaked.
   * 
   *  The head in itself can be a batch of up to [`Config::BatchSize`] stakers.
   */
  async getAsV10000(): Promise<v10000.UnstakeRequest | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'FastUnstake', 'Head')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('FastUnstake', 'Head') != null
  }
}

export class FastUnstakeQueueStorage {
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
   *  The map of all accounts wishing to be unstaked.
   * 
   *  Keeps track of `AccountId` wishing to unstake and it's corresponding deposit.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('FastUnstake', 'Queue') === '009da6de235ea9f0b5ac0b37d404d4fe998946da2f8f3e9c0899035c6d182a52'
  }

  /**
   *  The map of all accounts wishing to be unstaked.
   * 
   *  Keeps track of `AccountId` wishing to unstake and it's corresponding deposit.
   */
  async getAsV10000(key: Uint8Array): Promise<bigint | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'FastUnstake', 'Queue', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(bigint | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'FastUnstake', 'Queue', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(bigint)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'FastUnstake', 'Queue')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('FastUnstake', 'Queue') != null
  }
}

export class GrandpaCurrentSetIdStorage {
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
   *  The number of changes (both in terms of keys and underlying economic responsibilities)
   *  in the "set" of Grandpa validators from genesis.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'CurrentSetId') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  The number of changes (both in terms of keys and underlying economic responsibilities)
   *  in the "set" of Grandpa validators from genesis.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'CurrentSetId')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'CurrentSetId') != null
  }
}

export class GrandpaNextForcedStorage {
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
   *  next block number where we can force a change.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'NextForced') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  next block number where we can force a change.
   */
  async getAsV10000(): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'NextForced')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'NextForced') != null
  }
}

export class GrandpaPendingChangeStorage {
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
   *  Pending change: (signaled at, scheduled change).
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'PendingChange') === 'd8fc2937fb26b147a79b5d1c609ef3bb0386ef95a7bac7b1d42b218773058c3b'
  }

  /**
   *  Pending change: (signaled at, scheduled change).
   */
  async getAsV10000(): Promise<v10000.StoredPendingChange | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'PendingChange')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'PendingChange') != null
  }
}

export class GrandpaSetIdSessionStorage {
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
   *  A mapping from grandpa set ID to the index of the *most recent* session for which its
   *  members were responsible.
   * 
   *  This is only used for validating equivocation proofs. An equivocation proof must
   *  contains a key-ownership proof for a given session, therefore we need a way to tie
   *  together sessions and GRANDPA set ids, i.e. we need to validate that a validator
   *  was the owner of a given key on a given session, and what the active set ID was
   *  during that session.
   * 
   *  TWOX-NOTE: `SetId` is not under user control.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'SetIdSession') === '2d385d75717e58066ac593e8c94f49e0ce544a47573cd5889073ca2ac7c97de9'
  }

  /**
   *  A mapping from grandpa set ID to the index of the *most recent* session for which its
   *  members were responsible.
   * 
   *  This is only used for validating equivocation proofs. An equivocation proof must
   *  contains a key-ownership proof for a given session, therefore we need a way to tie
   *  together sessions and GRANDPA set ids, i.e. we need to validate that a validator
   *  was the owner of a given key on a given session, and what the active set ID was
   *  during that session.
   * 
   *  TWOX-NOTE: `SetId` is not under user control.
   */
  async getAsV10000(key: bigint): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'SetIdSession', key)
  }

  async getManyAsV10000(keys: bigint[]): Promise<(number | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Grandpa', 'SetIdSession', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(number)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Grandpa', 'SetIdSession')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'SetIdSession') != null
  }
}

export class GrandpaStalledStorage {
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
   *  `true` if we are currently stalled.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'Stalled') === '3b9e892deedcedebca6cccb95fac40be1ea485932811a2dcae3ec80a6b871360'
  }

  /**
   *  `true` if we are currently stalled.
   */
  async getAsV10000(): Promise<[number, number] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'Stalled')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'Stalled') != null
  }
}

export class GrandpaStateStorage {
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
   *  State of the current authority set.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Grandpa', 'State') === '7e7a7e0912740b55ac7227f3f2a3612d23a3fefb1cd7f6da52f12f322350a0ce'
  }

  /**
   *  State of the current authority set.
   */
  async getAsV10000(): Promise<v10000.StoredState> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Grandpa', 'State')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Grandpa', 'State') != null
  }
}

export class HistoricalHistoricalSessionsStorage {
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
   *  Mapping from historical session indices to session-data root hash and validator count.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Historical', 'HistoricalSessions') === 'afe4969e66062d457c91b0a05017143dec18b2df2255af7a75529647963464d0'
  }

  /**
   *  Mapping from historical session indices to session-data root hash and validator count.
   */
  async getAsV10000(key: number): Promise<[Uint8Array, number] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Historical', 'HistoricalSessions', key)
  }

  async getManyAsV10000(keys: number[]): Promise<([Uint8Array, number] | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Historical', 'HistoricalSessions', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([Uint8Array, number])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Historical', 'HistoricalSessions')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Historical', 'HistoricalSessions') != null
  }
}

export class HistoricalStoredRangeStorage {
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
   *  The range of historical sessions we store. [first, last)
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Historical', 'StoredRange') === '3b9e892deedcedebca6cccb95fac40be1ea485932811a2dcae3ec80a6b871360'
  }

  /**
   *  The range of historical sessions we store. [first, last)
   */
  async getAsV10000(): Promise<[number, number] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Historical', 'StoredRange')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Historical', 'StoredRange') != null
  }
}

export class IdentityIdentityOfStorage {
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
   *  Information that is pertinent to identify the entity behind an account.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Identity', 'IdentityOf') === 'eee9529c5197f7a5f8200e155d78bab0a612de49bd6c8941e539265edf54c3aa'
  }

  /**
   *  Information that is pertinent to identify the entity behind an account.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.Registration | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Identity', 'IdentityOf', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.Registration | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'IdentityOf', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.Registration)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'IdentityOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Identity', 'IdentityOf') != null
  }
}

export class IdentityRegistrarsStorage {
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
   *  The set of registrars. Not expected to get very big as can only be added through a
   *  special origin (likely a council motion).
   * 
   *  The index into this can be cast to `RegistrarIndex` to get a valid value.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Identity', 'Registrars') === 'd53feea500c88336983c65706eeb51794b1fc991a17d6d33663d49aeb47b12b6'
  }

  /**
   *  The set of registrars. Not expected to get very big as can only be added through a
   *  special origin (likely a council motion).
   * 
   *  The index into this can be cast to `RegistrarIndex` to get a valid value.
   */
  async getAsV10000(): Promise<(v10000.RegistrarInfo | undefined)[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Identity', 'Registrars')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Identity', 'Registrars') != null
  }
}

export class IdentitySubsOfStorage {
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
   *  Alternative "sub" identities of this account.
   * 
   *  The first item is the deposit, the second is a vector of the accounts.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Identity', 'SubsOf') === '925d8593182dee4b16701bef694e42944c6fa6f1d20d0a7b05fb8ed6b451f6b7'
  }

  /**
   *  Alternative "sub" identities of this account.
   * 
   *  The first item is the deposit, the second is a vector of the accounts.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  async getAsV10000(key: Uint8Array): Promise<[bigint, Uint8Array[]]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Identity', 'SubsOf', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<([bigint, Uint8Array[]])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'SubsOf', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([bigint, Uint8Array[]])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'SubsOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Identity', 'SubsOf') != null
  }
}

export class IdentitySuperOfStorage {
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
   *  The super-identity of an alternative "sub" identity together with its name, within that
   *  context. If the account is not some other account's sub-identity, then just `None`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Identity', 'SuperOf') === '3e2404306f316847b5946856f8222df193ecb9ace5e509cd9f8808145fd9b792'
  }

  /**
   *  The super-identity of an alternative "sub" identity together with its name, within that
   *  context. If the account is not some other account's sub-identity, then just `None`.
   */
  async getAsV10000(key: Uint8Array): Promise<[Uint8Array, v10000.Data] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Identity', 'SuperOf', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<([Uint8Array, v10000.Data] | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'SuperOf', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([Uint8Array, v10000.Data])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'SuperOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Identity', 'SuperOf') != null
  }
}

export class ImOnlineAuthoredBlocksStorage {
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
   *  For each session index, we keep a mapping of `ValidatorId<T>` to the
   *  number of blocks authored by the given authority.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ImOnline', 'AuthoredBlocks') === 'cc6a8dbe383d37ce9fa22935e3a1838a5aa7615fa4449b4318806f402f116ec9'
  }

  /**
   *  For each session index, we keep a mapping of `ValidatorId<T>` to the
   *  number of blocks authored by the given authority.
   */
  async getAsV10000(key1: number, key2: Uint8Array): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ImOnline', 'AuthoredBlocks', key1, key2)
  }

  async getManyAsV10000(keys: [number, Uint8Array][]): Promise<(number)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ImOnline', 'AuthoredBlocks', keys)
  }

  async getAllAsV10000(): Promise<(number)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ImOnline', 'AuthoredBlocks')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ImOnline', 'AuthoredBlocks') != null
  }
}

export class ImOnlineHeartbeatAfterStorage {
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
   *  The block number after which it's ok to send heartbeats in the current
   *  session.
   * 
   *  At the beginning of each session we set this to a value that should fall
   *  roughly in the middle of the session duration. The idea is to first wait for
   *  the validators to produce a block in the current session, so that the
   *  heartbeat later on will not be necessary.
   * 
   *  This value will only be used as a fallback if we fail to get a proper session
   *  progress estimate from `NextSessionRotation`, as those estimates should be
   *  more accurate then the value we calculate for `HeartbeatAfter`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ImOnline', 'HeartbeatAfter') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The block number after which it's ok to send heartbeats in the current
   *  session.
   * 
   *  At the beginning of each session we set this to a value that should fall
   *  roughly in the middle of the session duration. The idea is to first wait for
   *  the validators to produce a block in the current session, so that the
   *  heartbeat later on will not be necessary.
   * 
   *  This value will only be used as a fallback if we fail to get a proper session
   *  progress estimate from `NextSessionRotation`, as those estimates should be
   *  more accurate then the value we calculate for `HeartbeatAfter`.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ImOnline', 'HeartbeatAfter')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ImOnline', 'HeartbeatAfter') != null
  }
}

export class ImOnlineKeysStorage {
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
   *  The current set of keys that may issue a heartbeat.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ImOnline', 'Keys') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current set of keys that may issue a heartbeat.
   */
  async getAsV10000(): Promise<Uint8Array[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ImOnline', 'Keys')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ImOnline', 'Keys') != null
  }
}

export class ImOnlineReceivedHeartbeatsStorage {
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
   *  For each session index, we keep a mapping of `SessionIndex` and `AuthIndex`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('ImOnline', 'ReceivedHeartbeats') === 'b4938ce2b1a4622175a25ec0ced5440eed9240186372eaf8f9936eb90d0d565e'
  }

  /**
   *  For each session index, we keep a mapping of `SessionIndex` and `AuthIndex`.
   */
  async getAsV10000(key1: number, key2: number): Promise<boolean | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'ImOnline', 'ReceivedHeartbeats', key1, key2)
  }

  async getManyAsV10000(keys: [number, number][]): Promise<(boolean | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ImOnline', 'ReceivedHeartbeats', keys)
  }

  async getAllAsV10000(): Promise<(boolean)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'ImOnline', 'ReceivedHeartbeats')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ImOnline', 'ReceivedHeartbeats') != null
  }
}

export class IndicesAccountsStorage {
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
   *  The lookup from index to account.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Indices', 'Accounts') === 'c6d4b452610ac51f7c9427bf2d9910242bb414a02409a484caf47fa24e50516e'
  }

  /**
   *  The lookup from index to account.
   */
  async getAsV10000(key: number): Promise<[Uint8Array, bigint, boolean] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Indices', 'Accounts', key)
  }

  async getManyAsV10000(keys: number[]): Promise<([Uint8Array, bigint, boolean] | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Indices', 'Accounts', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([Uint8Array, bigint, boolean])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Indices', 'Accounts')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Indices', 'Accounts') != null
  }
}

export class MultisigMultisigsStorage {
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
   *  The set of open multisig operations.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Multisig', 'Multisigs') === 'b65d340f044c1216d5b13f831064204fe7a82b1bb66e6bf6cc01b1b5a3f1606a'
  }

  /**
   *  The set of open multisig operations.
   */
  async getAsV10000(key1: Uint8Array, key2: Uint8Array): Promise<v10000.Multisig | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Multisig', 'Multisigs', key1, key2)
  }

  async getManyAsV10000(keys: [Uint8Array, Uint8Array][]): Promise<(v10000.Multisig | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Multisig', 'Multisigs', keys)
  }

  async getAllAsV10000(): Promise<(v10000.Multisig)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Multisig', 'Multisigs')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Multisig', 'Multisigs') != null
  }
}

export class OffencesConcurrentReportsIndexStorage {
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
   *  A vector of reports of the same kind that happened at the same time slot.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Offences', 'ConcurrentReportsIndex') === 'd5c59a6db2baab9f1dcc1a37b0131a737935fd2082fcf39b6abc3f1d6e3ae008'
  }

  /**
   *  A vector of reports of the same kind that happened at the same time slot.
   */
  async getAsV10000(key1: Uint8Array, key2: Uint8Array): Promise<Uint8Array[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Offences', 'ConcurrentReportsIndex', key1, key2)
  }

  async getManyAsV10000(keys: [Uint8Array, Uint8Array][]): Promise<(Uint8Array[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Offences', 'ConcurrentReportsIndex', keys)
  }

  async getAllAsV10000(): Promise<(Uint8Array[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Offences', 'ConcurrentReportsIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Offences', 'ConcurrentReportsIndex') != null
  }
}

export class OffencesReportsStorage {
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
   *  The primary structure that holds all offence records keyed by report identifiers.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Offences', 'Reports') === 'e52641726adeb87007a96ce7684aad2f8233624d39e0ad7727f22f889bc9279f'
  }

  /**
   *  The primary structure that holds all offence records keyed by report identifiers.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.OffenceDetails | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Offences', 'Reports', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.OffenceDetails | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Offences', 'Reports', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.OffenceDetails)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Offences', 'Reports')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Offences', 'Reports') != null
  }
}

export class PreimagePreimageForStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('Preimage', 'PreimageFor') === '55fa1a08a9fac4bcf15d53fce590e3fb5af7fbc408ac4b8e1ed28f5f8a242534'
  }

  async getAsV10000(key: [Uint8Array, number]): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Preimage', 'PreimageFor', key)
  }

  async getManyAsV10000(keys: [Uint8Array, number][]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Preimage', 'PreimageFor', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Preimage', 'PreimageFor')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Preimage', 'PreimageFor') != null
  }
}

export class PreimageStatusForStorage {
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
   *  The request status of a given hash.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Preimage', 'StatusFor') === '16647d6a818ed8802ff108ffe98014d8de07d069008bb466b26b7367e684d574'
  }

  /**
   *  The request status of a given hash.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.RequestStatus | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Preimage', 'StatusFor', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.RequestStatus | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Preimage', 'StatusFor', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.RequestStatus)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Preimage', 'StatusFor')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Preimage', 'StatusFor') != null
  }
}

export class ProxyAnnouncementsStorage {
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
   *  The announcements made by the proxy (key).
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Proxy', 'Announcements') === 'b93d53c53a308d910b0304bf5593bd71084bcf177629ea67da68b9026f4b417c'
  }

  /**
   *  The announcements made by the proxy (key).
   */
  async getAsV10000(key: Uint8Array): Promise<[v10000.Announcement[], bigint]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Proxy', 'Announcements', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<([v10000.Announcement[], bigint])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Proxy', 'Announcements', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([v10000.Announcement[], bigint])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Proxy', 'Announcements')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Proxy', 'Announcements') != null
  }
}

export class ProxyProxiesStorage {
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
   *  The set of account proxies. Maps the account which has delegated to the accounts
   *  which are being delegated to, together with the amount held on deposit.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Proxy', 'Proxies') === 'c7ff6937299cbd868dd31b03d824fabfaf783eded7177c93dcec017287ff2055'
  }

  /**
   *  The set of account proxies. Maps the account which has delegated to the accounts
   *  which are being delegated to, together with the amount held on deposit.
   */
  async getAsV10000(key: Uint8Array): Promise<[v10000.ProxyDefinition[], bigint]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Proxy', 'Proxies', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<([v10000.ProxyDefinition[], bigint])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Proxy', 'Proxies', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([v10000.ProxyDefinition[], bigint])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Proxy', 'Proxies')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Proxy', 'Proxies') != null
  }
}

export class RecoveryActiveRecoveriesStorage {
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
   *  Active recovery attempts.
   * 
   *  First account is the account to be recovered, and the second account
   *  is the user trying to recover the account.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Recovery', 'ActiveRecoveries') === 'f5dad44e1c51a87a418fb5a1db781c2d814656f6b4adea220158b1d85e9e1622'
  }

  /**
   *  Active recovery attempts.
   * 
   *  First account is the account to be recovered, and the second account
   *  is the user trying to recover the account.
   */
  async getAsV10000(key1: Uint8Array, key2: Uint8Array): Promise<v10000.ActiveRecovery | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Recovery', 'ActiveRecoveries', key1, key2)
  }

  async getManyAsV10000(keys: [Uint8Array, Uint8Array][]): Promise<(v10000.ActiveRecovery | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Recovery', 'ActiveRecoveries', keys)
  }

  async getAllAsV10000(): Promise<(v10000.ActiveRecovery)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Recovery', 'ActiveRecoveries')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Recovery', 'ActiveRecoveries') != null
  }
}

export class RecoveryProxyStorage {
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
   *  The list of allowed proxy accounts.
   * 
   *  Map from the user who can access it to the recovered account.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Recovery', 'Proxy') === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
  }

  /**
   *  The list of allowed proxy accounts.
   * 
   *  Map from the user who can access it to the recovered account.
   */
  async getAsV10000(key: Uint8Array): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Recovery', 'Proxy', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Recovery', 'Proxy', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Recovery', 'Proxy')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Recovery', 'Proxy') != null
  }
}

export class RecoveryRecoverableStorage {
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
   *  The set of recoverable accounts and their recovery configuration.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Recovery', 'Recoverable') === 'f9493d29ddc03c2d5f186ec1168f1f86ff2385eb4dc7ca3278f0f82111d9e70b'
  }

  /**
   *  The set of recoverable accounts and their recovery configuration.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.RecoveryConfig | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Recovery', 'Recoverable', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.RecoveryConfig | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Recovery', 'Recoverable', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.RecoveryConfig)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Recovery', 'Recoverable')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Recovery', 'Recoverable') != null
  }
}

export class ReferendaDecidingCountStorage {
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
   *  The number of referenda being decided currently.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Referenda', 'DecidingCount') === '1b8a61a1a77f8c4a893b856d3455f1f9ced6f6e4bfe87bb8b1390b14318a4333'
  }

  /**
   *  The number of referenda being decided currently.
   */
  async getAsV10000(key: number): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Referenda', 'DecidingCount', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(number)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Referenda', 'DecidingCount', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(number)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Referenda', 'DecidingCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Referenda', 'DecidingCount') != null
  }
}

export class ReferendaMetadataOfStorage {
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
   *  The metadata is a general information concerning the referendum.
   *  The `PreimageHash` refers to the preimage of the `Preimages` provider which can be a JSON
   *  dump or IPFS hash of a JSON file.
   * 
   *  Consider a garbage collection for a metadata of finished referendums to `unrequest` (remove)
   *  large preimages.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Referenda', 'MetadataOf') === '00f526a103b6eaa28996183d1ec5ad27702e9d35d108bfdcc6c774fc48c5704a'
  }

  /**
   *  The metadata is a general information concerning the referendum.
   *  The `PreimageHash` refers to the preimage of the `Preimages` provider which can be a JSON
   *  dump or IPFS hash of a JSON file.
   * 
   *  Consider a garbage collection for a metadata of finished referendums to `unrequest` (remove)
   *  large preimages.
   */
  async getAsV10000(key: number): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Referenda', 'MetadataOf', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Referenda', 'MetadataOf', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Referenda', 'MetadataOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Referenda', 'MetadataOf') != null
  }
}

export class ReferendaReferendumCountStorage {
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
   *  The next free referendum index, aka the number of referenda started so far.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Referenda', 'ReferendumCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The next free referendum index, aka the number of referenda started so far.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Referenda', 'ReferendumCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Referenda', 'ReferendumCount') != null
  }
}

export class ReferendaReferendumInfoForStorage {
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
   *  Information concerning any given referendum.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Referenda', 'ReferendumInfoFor') === 'c6633c104503bb2ede52beb3b35f4b74ab01c43fa216f98bfd51e6c0be94d51e'
  }

  /**
   *  Information concerning any given referendum.
   */
  async getAsV10000(key: number): Promise<v10000.ReferendumInfo | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Referenda', 'ReferendumInfoFor', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(v10000.ReferendumInfo | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Referenda', 'ReferendumInfoFor', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.ReferendumInfo)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Referenda', 'ReferendumInfoFor')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Referenda', 'ReferendumInfoFor') != null
  }
}

export class ReferendaTrackQueueStorage {
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
   *  The sorted list of referenda ready to be decided but not yet being decided, ordered by
   *  conviction-weighted approvals.
   * 
   *  This should be empty if `DecidingCount` is less than `TrackInfo::max_deciding`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Referenda', 'TrackQueue') === 'd59fac77bd4348bf0179a7e6c5ac239a8b8781c07a1524886ec03b3194de72e3'
  }

  /**
   *  The sorted list of referenda ready to be decided but not yet being decided, ordered by
   *  conviction-weighted approvals.
   * 
   *  This should be empty if `DecidingCount` is less than `TrackInfo::max_deciding`.
   */
  async getAsV10000(key: number): Promise<[number, bigint][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Referenda', 'TrackQueue', key)
  }

  async getManyAsV10000(keys: number[]): Promise<([number, bigint][])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Referenda', 'TrackQueue', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([number, bigint][])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Referenda', 'TrackQueue')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Referenda', 'TrackQueue') != null
  }
}

export class SchedulerAgendaStorage {
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
   *  Items to be executed, indexed by the block number that they should be executed on.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Scheduler', 'Agenda') === 'bed237c1742390b670ed602b59374233d1eb38c40a18282576d3bc0a12a3eb75'
  }

  /**
   *  Items to be executed, indexed by the block number that they should be executed on.
   */
  async getAsV10000(key: number): Promise<(v10000.Scheduled | undefined)[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Scheduler', 'Agenda', key)
  }

  async getManyAsV10000(keys: number[]): Promise<((v10000.Scheduled | undefined)[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Scheduler', 'Agenda', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<((v10000.Scheduled | undefined)[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Scheduler', 'Agenda')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Scheduler', 'Agenda') != null
  }
}

export class SchedulerIncompleteSinceStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('Scheduler', 'IncompleteSince') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  async getAsV10000(): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Scheduler', 'IncompleteSince')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Scheduler', 'IncompleteSince') != null
  }
}

export class SchedulerLookupStorage {
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
   *  Lookup from a name to the block number and index of the task.
   * 
   *  For v3 -> v4 the previously unbounded identities are Blake2-256 hashed to form the v4
   *  identities.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Scheduler', 'Lookup') === '2072b6dc95511eafaaa8d3c8e8abab0becedb083c12e24f0be979006686149cd'
  }

  /**
   *  Lookup from a name to the block number and index of the task.
   * 
   *  For v3 -> v4 the previously unbounded identities are Blake2-256 hashed to form the v4
   *  identities.
   */
  async getAsV10000(key: Uint8Array): Promise<[number, number] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Scheduler', 'Lookup', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<([number, number] | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Scheduler', 'Lookup', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([number, number])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Scheduler', 'Lookup')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Scheduler', 'Lookup') != null
  }
}

export class SessionCurrentIndexStorage {
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
   *  Current index of the session.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Session', 'CurrentIndex') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Current index of the session.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Session', 'CurrentIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'CurrentIndex') != null
  }
}

export class SessionDisabledValidatorsStorage {
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
   *  Indices of disabled validators.
   * 
   *  The vec is always kept sorted so that we can find whether a given validator is
   *  disabled using binary search. It gets cleared when `on_session_ending` returns
   *  a new set of identities.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Session', 'DisabledValidators') === 'a9f6979e68cec9d5834e7d077129aa05e8b477f326cb009049d2178afbea14f0'
  }

  /**
   *  Indices of disabled validators.
   * 
   *  The vec is always kept sorted so that we can find whether a given validator is
   *  disabled using binary search. It gets cleared when `on_session_ending` returns
   *  a new set of identities.
   */
  async getAsV10000(): Promise<number[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Session', 'DisabledValidators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'DisabledValidators') != null
  }
}

export class SessionKeyOwnerStorage {
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
   *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Session', 'KeyOwner') === '20cf09ea865a34d19d79cca4e3df7a5a719547bdf984f5ab8eb811d55da822e5'
  }

  /**
   *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
   */
  async getAsV10000(key: [Uint8Array, Uint8Array]): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Session', 'KeyOwner', key)
  }

  async getManyAsV10000(keys: [Uint8Array, Uint8Array][]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Session', 'KeyOwner', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Session', 'KeyOwner')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'KeyOwner') != null
  }
}

export class SessionNextKeysStorage {
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
   *  The next session keys for a validator.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Session', 'NextKeys') === '49e16dd0ead604a4488a9417b93f8792ff7fea188a8cbc99a3cb059b22ca29c2'
  }

  /**
   *  The next session keys for a validator.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.SessionKeys | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Session', 'NextKeys', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.SessionKeys | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Session', 'NextKeys', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.SessionKeys)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Session', 'NextKeys')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'NextKeys') != null
  }
}

export class SessionQueuedChangedStorage {
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
   *  True if the underlying economic identities or weighting behind the validators
   *  has changed in the queued validator set.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Session', 'QueuedChanged') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if the underlying economic identities or weighting behind the validators
   *  has changed in the queued validator set.
   */
  async getAsV10000(): Promise<boolean> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Session', 'QueuedChanged')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'QueuedChanged') != null
  }
}

export class SessionQueuedKeysStorage {
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
   *  The queued keys for the next session. When the next session begins, these keys
   *  will be used to determine the validator's session keys.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Session', 'QueuedKeys') === 'a6f967d9178fb4c75fdd76c4f2c7d3b0c4b189134ba1f1fddd0de5c14f5a0934'
  }

  /**
   *  The queued keys for the next session. When the next session begins, these keys
   *  will be used to determine the validator's session keys.
   */
  async getAsV10000(): Promise<[Uint8Array, v10000.SessionKeys][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Session', 'QueuedKeys')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'QueuedKeys') != null
  }
}

export class SessionValidatorsStorage {
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
   *  The current set of validators.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Session', 'Validators') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current set of validators.
   */
  async getAsV10000(): Promise<Uint8Array[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Session', 'Validators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'Validators') != null
  }
}

export class StakingActiveEraStorage {
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
   *  The active era information, it holds index and start.
   * 
   *  The active era is the era being currently rewarded. Validator set of this era must be
   *  equal to [`SessionInterface::validators`].
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ActiveEra') === '2bb946dd9c19de9f4332897005d1255528c610172f7418fae165b5dafd3cfbfe'
  }

  /**
   *  The active era information, it holds index and start.
   * 
   *  The active era is the era being currently rewarded. Validator set of this era must be
   *  equal to [`SessionInterface::validators`].
   */
  async getAsV10000(): Promise<v10000.ActiveEraInfo | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ActiveEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ActiveEra') != null
  }
}

export class StakingBondedStorage {
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
   *  Map from all locked "stash" accounts to the controller account.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'Bonded') === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
  }

  /**
   *  Map from all locked "stash" accounts to the controller account.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  async getAsV10000(key: Uint8Array): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Bonded', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Bonded', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Bonded')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Bonded') != null
  }
}

export class StakingBondedErasStorage {
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
   *  A mapping from still-bonded eras to the first session index of that era.
   * 
   *  Must contains information for eras for the range:
   *  `[active_era - bounding_duration; active_era]`
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'BondedEras') === 'b780f37018db8d8815c6dfde98846c55b5b1d988a7cd0aa1531c92701eab1e95'
  }

  /**
   *  A mapping from still-bonded eras to the first session index of that era.
   * 
   *  Must contains information for eras for the range:
   *  `[active_era - bounding_duration; active_era]`
   */
  async getAsV10000(): Promise<[number, number][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'BondedEras')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'BondedEras') != null
  }
}

export class StakingCanceledSlashPayoutStorage {
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
   *  The amount of currency given to reporters of a slash event which was
   *  canceled by extraordinary circumstances (e.g. governance).
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'CanceledSlashPayout') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The amount of currency given to reporters of a slash event which was
   *  canceled by extraordinary circumstances (e.g. governance).
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'CanceledSlashPayout')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'CanceledSlashPayout') != null
  }
}

export class StakingChillThresholdStorage {
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
   *  The threshold for when users can start calling `chill_other` for other validators /
   *  nominators. The threshold is compared to the actual number of validators / nominators
   *  (`CountFor*`) in the system compared to the configured max (`Max*Count`).
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ChillThreshold') === 'a05bf6dd806233a6b9a22cb1cd50bcf79bcb6a1f3014c295988bec299abc5cd3'
  }

  /**
   *  The threshold for when users can start calling `chill_other` for other validators /
   *  nominators. The threshold is compared to the actual number of validators / nominators
   *  (`CountFor*`) in the system compared to the configured max (`Max*Count`).
   */
  async getAsV10000(): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ChillThreshold')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ChillThreshold') != null
  }
}

export class StakingCounterForNominatorsStorage {
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
   * Counter for the related counted storage map
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'CounterForNominators') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   * Counter for the related counted storage map
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'CounterForNominators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'CounterForNominators') != null
  }
}

export class StakingCounterForValidatorsStorage {
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
   * Counter for the related counted storage map
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'CounterForValidators') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   * Counter for the related counted storage map
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'CounterForValidators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'CounterForValidators') != null
  }
}

export class StakingCurrentEraStorage {
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
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how the Session pallet queues the validator
   *  set, it might be active or not.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'CurrentEra') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  The current era index.
   * 
   *  This is the latest planned era, depending on how the Session pallet queues the validator
   *  set, it might be active or not.
   */
  async getAsV10000(): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'CurrentEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'CurrentEra') != null
  }
}

export class StakingCurrentPlannedSessionStorage {
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
   *  The last planned session scheduled by the session pallet.
   * 
   *  This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'CurrentPlannedSession') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The last planned session scheduled by the session pallet.
   * 
   *  This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'CurrentPlannedSession')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'CurrentPlannedSession') != null
  }
}

export class StakingErasRewardPointsStorage {
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
   *  Rewards for the last `HISTORY_DEPTH` eras.
   *  If reward hasn't been set or has been removed then 0 reward is returned.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasRewardPoints') === '48c202c7b8424da56b623834c54ceaf74129dbd88a59c39931cc7ba131501b50'
  }

  /**
   *  Rewards for the last `HISTORY_DEPTH` eras.
   *  If reward hasn't been set or has been removed then 0 reward is returned.
   */
  async getAsV10000(key: number): Promise<v10000.EraRewardPoints> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ErasRewardPoints', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(v10000.EraRewardPoints)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasRewardPoints', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.EraRewardPoints)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasRewardPoints')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasRewardPoints') != null
  }
}

export class StakingErasStakersStorage {
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
   *  Exposure of validator at era.
   * 
   *  This is keyed first by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   *  If stakers hasn't been set or has been removed then empty exposure is returned.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasStakers') === 'f3f726cc814cef290657008054cd10667b250a01d2842ff3bbbcca24c98abf5b'
  }

  /**
   *  Exposure of validator at era.
   * 
   *  This is keyed first by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   *  If stakers hasn't been set or has been removed then empty exposure is returned.
   */
  async getAsV10000(key1: number, key2: Uint8Array): Promise<v10000.Exposure> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ErasStakers', key1, key2)
  }

  async getManyAsV10000(keys: [number, Uint8Array][]): Promise<(v10000.Exposure)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasStakers', keys)
  }

  async getAllAsV10000(): Promise<(v10000.Exposure)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasStakers')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasStakers') != null
  }
}

export class StakingErasStakersClippedStorage {
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
   *  Clipped Exposure of validator at era.
   * 
   *  This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
   *  `T::MaxNominatorRewardedPerValidator` biggest stakers.
   *  (Note: the field `total` and `own` of the exposure remains unchanged).
   *  This is used to limit the i/o cost for the nominator payout.
   * 
   *  This is keyed fist by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   *  If stakers hasn't been set or has been removed then empty exposure is returned.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasStakersClipped') === 'f3f726cc814cef290657008054cd10667b250a01d2842ff3bbbcca24c98abf5b'
  }

  /**
   *  Clipped Exposure of validator at era.
   * 
   *  This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
   *  `T::MaxNominatorRewardedPerValidator` biggest stakers.
   *  (Note: the field `total` and `own` of the exposure remains unchanged).
   *  This is used to limit the i/o cost for the nominator payout.
   * 
   *  This is keyed fist by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   *  If stakers hasn't been set or has been removed then empty exposure is returned.
   */
  async getAsV10000(key1: number, key2: Uint8Array): Promise<v10000.Exposure> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ErasStakersClipped', key1, key2)
  }

  async getManyAsV10000(keys: [number, Uint8Array][]): Promise<(v10000.Exposure)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasStakersClipped', keys)
  }

  async getAllAsV10000(): Promise<(v10000.Exposure)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasStakersClipped')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasStakersClipped') != null
  }
}

export class StakingErasStartSessionIndexStorage {
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
   *  The session index at which the era start for the last `HISTORY_DEPTH` eras.
   * 
   *  Note: This tracks the starting session (i.e. session index when era start being active)
   *  for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasStartSessionIndex') === '8abbf6045d679e1267b0be7870d035c80cf57bb79cd0d9a111d1521cf79efdde'
  }

  /**
   *  The session index at which the era start for the last `HISTORY_DEPTH` eras.
   * 
   *  Note: This tracks the starting session (i.e. session index when era start being active)
   *  for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
   */
  async getAsV10000(key: number): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ErasStartSessionIndex', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(number | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasStartSessionIndex', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(number)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasStartSessionIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasStartSessionIndex') != null
  }
}

export class StakingErasTotalStakeStorage {
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
   *  The total amount staked for the last `HISTORY_DEPTH` eras.
   *  If total hasn't been set or has been removed then 0 stake is returned.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasTotalStake') === 'd4b0e776f9f1d19233fe32cd062ab41a912af3d15ceb9d02d9ebc8fbe7b1cda4'
  }

  /**
   *  The total amount staked for the last `HISTORY_DEPTH` eras.
   *  If total hasn't been set or has been removed then 0 stake is returned.
   */
  async getAsV10000(key: number): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ErasTotalStake', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(bigint)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasTotalStake', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(bigint)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasTotalStake')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasTotalStake') != null
  }
}

export class StakingErasValidatorPrefsStorage {
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
   *  Similar to `ErasStakers`, this holds the preferences of validators.
   * 
   *  This is keyed first by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasValidatorPrefs') === '2f145e368b1c1a9540437d8c25b9502d09b7e977e27a6bb99156b6bf2c6269d2'
  }

  /**
   *  Similar to `ErasStakers`, this holds the preferences of validators.
   * 
   *  This is keyed first by the era index to allow bulk deletion and then the stash account.
   * 
   *  Is it removed after `HISTORY_DEPTH` eras.
   */
  async getAsV10000(key1: number, key2: Uint8Array): Promise<v10000.ValidatorPrefs> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ErasValidatorPrefs', key1, key2)
  }

  async getManyAsV10000(keys: [number, Uint8Array][]): Promise<(v10000.ValidatorPrefs)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasValidatorPrefs', keys)
  }

  async getAllAsV10000(): Promise<(v10000.ValidatorPrefs)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasValidatorPrefs')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasValidatorPrefs') != null
  }
}

export class StakingErasValidatorRewardStorage {
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
   *  The total validator era payout for the last `HISTORY_DEPTH` eras.
   * 
   *  Eras that haven't finished yet or has been removed doesn't have reward.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasValidatorReward') === '3780d76d37a3d09046e926a777def6003178c440a915a931a34a74b88a4094a5'
  }

  /**
   *  The total validator era payout for the last `HISTORY_DEPTH` eras.
   * 
   *  Eras that haven't finished yet or has been removed doesn't have reward.
   */
  async getAsV10000(key: number): Promise<bigint | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ErasValidatorReward', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(bigint | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasValidatorReward', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(bigint)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ErasValidatorReward')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ErasValidatorReward') != null
  }
}

export class StakingForceEraStorage {
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
   *  Mode of era forcing.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ForceEra') === 'b7c79f26737f4e7aed039b709a4e473b3e4912bf8a2efbe7cc8c5fc9f7531c81'
  }

  /**
   *  Mode of era forcing.
   */
  async getAsV10000(): Promise<v10000.Forcing> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ForceEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ForceEra') != null
  }
}

export class StakingInvulnerablesStorage {
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
   *  Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
   *  easy to initialize and the performance hit is minimal (we expect no more than four
   *  invulnerables) and restricted to testnets.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'Invulnerables') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
   *  easy to initialize and the performance hit is minimal (we expect no more than four
   *  invulnerables) and restricted to testnets.
   */
  async getAsV10000(): Promise<Uint8Array[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Invulnerables')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Invulnerables') != null
  }
}

export class StakingLedgerStorage {
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
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'Ledger') === '838ac827cb2532f983c68467cfa97afcccf6147fb96e61e136394060880b64a4'
  }

  /**
   *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.StakingLedger | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Ledger', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.StakingLedger | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Ledger', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.StakingLedger)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Ledger')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Ledger') != null
  }
}

export class StakingMaxNominatorsCountStorage {
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
   *  The maximum nominator count before we stop allowing new validators to join.
   * 
   *  When this value is not set, no limits are enforced.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'MaxNominatorsCount') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  The maximum nominator count before we stop allowing new validators to join.
   * 
   *  When this value is not set, no limits are enforced.
   */
  async getAsV10000(): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'MaxNominatorsCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'MaxNominatorsCount') != null
  }
}

export class StakingMaxValidatorsCountStorage {
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
   *  The maximum validator count before we stop allowing new validators to join.
   * 
   *  When this value is not set, no limits are enforced.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'MaxValidatorsCount') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  The maximum validator count before we stop allowing new validators to join.
   * 
   *  When this value is not set, no limits are enforced.
   */
  async getAsV10000(): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'MaxValidatorsCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'MaxValidatorsCount') != null
  }
}

export class StakingMinCommissionStorage {
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
   *  The minimum amount of commission that validators can set.
   * 
   *  If set to `0`, no limit exists.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'MinCommission') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The minimum amount of commission that validators can set.
   * 
   *  If set to `0`, no limit exists.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'MinCommission')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'MinCommission') != null
  }
}

export class StakingMinNominatorBondStorage {
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
   *  The minimum active bond to become and maintain the role of a nominator.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'MinNominatorBond') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The minimum active bond to become and maintain the role of a nominator.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'MinNominatorBond')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'MinNominatorBond') != null
  }
}

export class StakingMinValidatorBondStorage {
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
   *  The minimum active bond to become and maintain the role of a validator.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'MinValidatorBond') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The minimum active bond to become and maintain the role of a validator.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'MinValidatorBond')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'MinValidatorBond') != null
  }
}

export class StakingMinimumActiveStakeStorage {
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
   *  The minimum active nominator stake of the last successful election.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'MinimumActiveStake') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The minimum active nominator stake of the last successful election.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'MinimumActiveStake')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'MinimumActiveStake') != null
  }
}

export class StakingMinimumValidatorCountStorage {
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
   *  Minimum number of staking participants before emergency conditions are imposed.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'MinimumValidatorCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Minimum number of staking participants before emergency conditions are imposed.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'MinimumValidatorCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'MinimumValidatorCount') != null
  }
}

export class StakingNominatorSlashInEraStorage {
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
   *  All slashing events on nominators, mapped by era to the highest slash value of the era.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'NominatorSlashInEra') === '019c211c1e4452f7fe517a6d5cafde0784f5991ddd51ac15e84213941f3208c2'
  }

  /**
   *  All slashing events on nominators, mapped by era to the highest slash value of the era.
   */
  async getAsV10000(key1: number, key2: Uint8Array): Promise<bigint | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'NominatorSlashInEra', key1, key2)
  }

  async getManyAsV10000(keys: [number, Uint8Array][]): Promise<(bigint | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'NominatorSlashInEra', keys)
  }

  async getAllAsV10000(): Promise<(bigint)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'NominatorSlashInEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'NominatorSlashInEra') != null
  }
}

export class StakingNominatorsStorage {
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
   *  The map from nominator stash key to their nomination preferences, namely the validators that
   *  they wish to support.
   * 
   *  Note that the keys of this storage map might become non-decodable in case the
   *  [`Config::MaxNominations`] configuration is decreased. In this rare case, these nominators
   *  are still existent in storage, their key is correct and retrievable (i.e. `contains_key`
   *  indicates that they exist), but their value cannot be decoded. Therefore, the non-decodable
   *  nominators will effectively not-exist, until they re-submit their preferences such that it
   *  is within the bounds of the newly set `Config::MaxNominations`.
   * 
   *  This implies that `::iter_keys().count()` and `::iter().count()` might return different
   *  values for this map. Moreover, the main `::count()` is aligned with the former, namely the
   *  number of keys that exist.
   * 
   *  Lastly, if any of the nominators become non-decodable, they can be chilled immediately via
   *  [`Call::chill_other`] dispatchable by anyone.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'Nominators') === 'a72d3e17e59f46bbd05fb0efd27052437fe2b1c41b0c89fe950edfb3b79e3c78'
  }

  /**
   *  The map from nominator stash key to their nomination preferences, namely the validators that
   *  they wish to support.
   * 
   *  Note that the keys of this storage map might become non-decodable in case the
   *  [`Config::MaxNominations`] configuration is decreased. In this rare case, these nominators
   *  are still existent in storage, their key is correct and retrievable (i.e. `contains_key`
   *  indicates that they exist), but their value cannot be decoded. Therefore, the non-decodable
   *  nominators will effectively not-exist, until they re-submit their preferences such that it
   *  is within the bounds of the newly set `Config::MaxNominations`.
   * 
   *  This implies that `::iter_keys().count()` and `::iter().count()` might return different
   *  values for this map. Moreover, the main `::count()` is aligned with the former, namely the
   *  number of keys that exist.
   * 
   *  Lastly, if any of the nominators become non-decodable, they can be chilled immediately via
   *  [`Call::chill_other`] dispatchable by anyone.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.Nominations | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Nominators', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.Nominations | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Nominators', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.Nominations)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Nominators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Nominators') != null
  }
}

export class StakingOffendingValidatorsStorage {
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
   *  Indices of validators that have offended in the active era and whether they are currently
   *  disabled.
   * 
   *  This value should be a superset of disabled validators since not all offences lead to the
   *  validator being disabled (if there was no slash). This is needed to track the percentage of
   *  validators that have offended in the current era, ensuring a new era is forced if
   *  `OffendingValidatorsThreshold` is reached. The vec is always kept sorted so that we can find
   *  whether a given validator has previously offended using binary search. It gets cleared when
   *  the era ends.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'OffendingValidators') === 'f462a122689229c7df85ebbfd1e391ea27650c460999212f2c78a9a5675dd9e6'
  }

  /**
   *  Indices of validators that have offended in the active era and whether they are currently
   *  disabled.
   * 
   *  This value should be a superset of disabled validators since not all offences lead to the
   *  validator being disabled (if there was no slash). This is needed to track the percentage of
   *  validators that have offended in the current era, ensuring a new era is forced if
   *  `OffendingValidatorsThreshold` is reached. The vec is always kept sorted so that we can find
   *  whether a given validator has previously offended using binary search. It gets cleared when
   *  the era ends.
   */
  async getAsV10000(): Promise<[number, boolean][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'OffendingValidators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'OffendingValidators') != null
  }
}

export class StakingPayeeStorage {
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
   *  Where the reward payment should be made. Keyed by stash.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'Payee') === '997acadf80b79903fb4386b933d481dff61dad22612d657f19f39b937ea8d992'
  }

  /**
   *  Where the reward payment should be made. Keyed by stash.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.RewardDestination> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Payee', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.RewardDestination)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Payee', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.RewardDestination)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Payee')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Payee') != null
  }
}

export class StakingSlashRewardFractionStorage {
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
   *  The percentage of the slash that is distributed to reporters.
   * 
   *  The rest of the slashed value is handled by the `Slash`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'SlashRewardFraction') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The percentage of the slash that is distributed to reporters.
   * 
   *  The rest of the slashed value is handled by the `Slash`.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'SlashRewardFraction')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'SlashRewardFraction') != null
  }
}

export class StakingSlashingSpansStorage {
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
   *  Slashing spans for stash accounts.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'SlashingSpans') === 'b2f49d14e3e4e56cf533a97be4eadb0e19c21d28a6b1b78aa85d7fda1f7e298b'
  }

  /**
   *  Slashing spans for stash accounts.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.SlashingSpans | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'SlashingSpans', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.SlashingSpans | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'SlashingSpans', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.SlashingSpans)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'SlashingSpans')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'SlashingSpans') != null
  }
}

export class StakingSpanSlashStorage {
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
   *  Records information about the maximum slash of a stash within a slashing span,
   *  as well as how much reward has been paid out.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'SpanSlash') === '3c3a6ad88aa43453f825e9fdcd8fb3dbdc0bef20e2be50b06d357c7c3d8e3488'
  }

  /**
   *  Records information about the maximum slash of a stash within a slashing span,
   *  as well as how much reward has been paid out.
   */
  async getAsV10000(key: [Uint8Array, number]): Promise<v10000.SpanRecord> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'SpanSlash', key)
  }

  async getManyAsV10000(keys: [Uint8Array, number][]): Promise<(v10000.SpanRecord)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'SpanSlash', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.SpanRecord)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'SpanSlash')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'SpanSlash') != null
  }
}

export class StakingUnappliedSlashesStorage {
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
   *  All unapplied slashes that are queued for later.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'UnappliedSlashes') === '8264329f163dd76100f9d2270735f3a3cb745c5af616ebd0e203d417e2039503'
  }

  /**
   *  All unapplied slashes that are queued for later.
   */
  async getAsV10000(key: number): Promise<v10000.UnappliedSlash[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'UnappliedSlashes', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(v10000.UnappliedSlash[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'UnappliedSlashes', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.UnappliedSlash[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'UnappliedSlashes')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'UnappliedSlashes') != null
  }
}

export class StakingValidatorCountStorage {
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
   *  The ideal number of active validators.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ValidatorCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The ideal number of active validators.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ValidatorCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ValidatorCount') != null
  }
}

export class StakingValidatorSlashInEraStorage {
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
   *  All slashing events on validators, mapped by era to the highest slash proportion
   *  and slash value of the era.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'ValidatorSlashInEra') === 'facf161fd07f9163ac7ab48199356f8083a31ec97fe569c9c5e6fd30fe0ce3ae'
  }

  /**
   *  All slashing events on validators, mapped by era to the highest slash proportion
   *  and slash value of the era.
   */
  async getAsV10000(key1: number, key2: Uint8Array): Promise<[number, bigint] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'ValidatorSlashInEra', key1, key2)
  }

  async getManyAsV10000(keys: [number, Uint8Array][]): Promise<([number, bigint] | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ValidatorSlashInEra', keys)
  }

  async getAllAsV10000(): Promise<([number, bigint])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'ValidatorSlashInEra')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'ValidatorSlashInEra') != null
  }
}

export class StakingValidatorsStorage {
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
   *  The map from (wannabe) validator stash key to the preferences of that validator.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Staking', 'Validators') === 'fa08b7a9cd071c2833987f5924d940cf66842072b85af5ecfc3afcf9fbb2ebd0'
  }

  /**
   *  The map from (wannabe) validator stash key to the preferences of that validator.
   * 
   *  TWOX-NOTE: SAFE since `AccountId` is a secure hash.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.ValidatorPrefs> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Staking', 'Validators', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.ValidatorPrefs)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Validators', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.ValidatorPrefs)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Staking', 'Validators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Staking', 'Validators') != null
  }
}

export class SudoKeyStorage {
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
   *  The `AccountId` of the sudo key.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Sudo', 'Key') === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
  }

  /**
   *  The `AccountId` of the sudo key.
   */
  async getAsV10000(): Promise<Uint8Array | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Sudo', 'Key')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Sudo', 'Key') != null
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

export class SystemAllExtrinsicsLenStorage {
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
   *  Total length (in bytes) for all extrinsics put together, for the current block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'AllExtrinsicsLen') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Total length (in bytes) for all extrinsics put together, for the current block.
   */
  async getAsV10000(): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'AllExtrinsicsLen')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'AllExtrinsicsLen') != null
  }
}

export class SystemBlockHashStorage {
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
   *  Map of block numbers to block hashes.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'BlockHash') === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
  }

  /**
   *  Map of block numbers to block hashes.
   */
  async getAsV10000(key: number): Promise<Uint8Array> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'BlockHash', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'System', 'BlockHash', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'System', 'BlockHash')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'BlockHash') != null
  }
}

export class SystemBlockWeightStorage {
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
   *  The current weight for the block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'BlockWeight') === '1b5ecb31f1f780ce8b20535384ce7b3159da495c9f1cbf13a2f253ccb02ae175'
  }

  /**
   *  The current weight for the block.
   */
  async getAsV10000(): Promise<v10000.PerDispatchClass> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'BlockWeight')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'BlockWeight') != null
  }
}

export class SystemDigestStorage {
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
   *  Digest of the current block, also part of the block header.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'Digest') === '6edb48fd53810bda6cc1015d69e4aacd63966970836398edb4a47cec0bf3fa85'
  }

  /**
   *  Digest of the current block, also part of the block header.
   */
  async getAsV10000(): Promise<v10000.Digest> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'Digest')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Digest') != null
  }
}

export class SystemEventCountStorage {
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
   *  The number of events in the `Events<T>` list.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'EventCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The number of events in the `Events<T>` list.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'EventCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'EventCount') != null
  }
}

export class SystemEventTopicsStorage {
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
   *  Mapping between a topic (represented by T::Hash) and a vector of indexes
   *  of events in the `<Events<T>>` list.
   * 
   *  All topic vectors have deterministic storage locations depending on the topic. This
   *  allows light-clients to leverage the changes trie storage tracking mechanism and
   *  in case of changes fetch the list of events of interest.
   * 
   *  The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
   *  the `EventIndex` then in case if the topic has the same contents on the next block
   *  no notification will be triggered thus the event might be lost.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'EventTopics') === 'd5ef37ba3daec264a9dcba5a29bf5b2ff23eb80b912936f924f44a8db557c58d'
  }

  /**
   *  Mapping between a topic (represented by T::Hash) and a vector of indexes
   *  of events in the `<Events<T>>` list.
   * 
   *  All topic vectors have deterministic storage locations depending on the topic. This
   *  allows light-clients to leverage the changes trie storage tracking mechanism and
   *  in case of changes fetch the list of events of interest.
   * 
   *  The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
   *  the `EventIndex` then in case if the topic has the same contents on the next block
   *  no notification will be triggered thus the event might be lost.
   */
  async getAsV10000(key: Uint8Array): Promise<[number, number][]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'EventTopics', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<([number, number][])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'System', 'EventTopics', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<([number, number][])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'System', 'EventTopics')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'EventTopics') != null
  }
}

export class SystemEventsStorage {
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
   *  Events deposited for the current block.
   * 
   *  NOTE: The item is unbound and should therefore never be read on chain.
   *  It could otherwise inflate the PoV size of a block.
   * 
   *  Events have a large in-memory size. Box the events to not go out-of-memory
   *  just in case someone still reads them from within the runtime.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'Events') === 'd38752f1b0569feff0c3be2bd14ed0771caf73b020211972bfa5401d78b02cb6'
  }

  /**
   *  Events deposited for the current block.
   * 
   *  NOTE: The item is unbound and should therefore never be read on chain.
   *  It could otherwise inflate the PoV size of a block.
   * 
   *  Events have a large in-memory size. Box the events to not go out-of-memory
   *  just in case someone still reads them from within the runtime.
   */
  async getAsV10000(): Promise<v10000.EventRecord[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'Events')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Events') != null
  }
}

export class SystemExecutionPhaseStorage {
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
   *  The execution phase of the block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'ExecutionPhase') === '0ad1e323fa21971add5b3b0cc709a6e02dc7c64db7d344c1a67ec0227969ae75'
  }

  /**
   *  The execution phase of the block.
   */
  async getAsV10000(): Promise<v10000.Type_320 | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'ExecutionPhase')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExecutionPhase') != null
  }
}

export class SystemExtrinsicCountStorage {
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
   *  Total extrinsics count for the current block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicCount') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Total extrinsics count for the current block.
   */
  async getAsV10000(): Promise<number | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'ExtrinsicCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicCount') != null
  }
}

export class SystemExtrinsicDataStorage {
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
   *  Extrinsics data for the current block (maps an extrinsic's index to its data).
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicData') === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
  }

  /**
   *  Extrinsics data for the current block (maps an extrinsic's index to its data).
   */
  async getAsV10000(key: number): Promise<Uint8Array> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'ExtrinsicData', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'System', 'ExtrinsicData', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(Uint8Array)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'System', 'ExtrinsicData')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicData') != null
  }
}

export class SystemLastRuntimeUpgradeStorage {
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
   *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'LastRuntimeUpgrade') === 'e03e445e7a7694163bede3a772a8a347abf7a3a00424fbafec75f819d6173a17'
  }

  /**
   *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
   */
  async getAsV10000(): Promise<v10000.LastRuntimeUpgradeInfo | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'LastRuntimeUpgrade')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'LastRuntimeUpgrade') != null
  }
}

export class SystemNumberStorage {
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
   *  The current block number being processed. Set by `execute_block`.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'Number') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The current block number being processed. Set by `execute_block`.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'Number')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Number') != null
  }
}

export class SystemParentHashStorage {
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
   *  Hash of the previous block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'ParentHash') === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
  }

  /**
   *  Hash of the previous block.
   */
  async getAsV10000(): Promise<Uint8Array> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'ParentHash')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ParentHash') != null
  }
}

export class SystemUpgradedToTripleRefCountStorage {
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
   *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
   *  (default) if not.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToTripleRefCount') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
   *  (default) if not.
   */
  async getAsV10000(): Promise<boolean> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'UpgradedToTripleRefCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToTripleRefCount') != null
  }
}

export class SystemUpgradedToU32RefCountStorage {
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
   *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToU32RefCount') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
   */
  async getAsV10000(): Promise<boolean> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'System', 'UpgradedToU32RefCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToU32RefCount') != null
  }
}

export class TimestampDidUpdateStorage {
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
   *  Did the timestamp get updated in this block?
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Timestamp', 'DidUpdate') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Did the timestamp get updated in this block?
   */
  async getAsV10000(): Promise<boolean> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Timestamp', 'DidUpdate')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Timestamp', 'DidUpdate') != null
  }
}

export class TimestampNowStorage {
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
   *  Current time for the current block.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Timestamp', 'Now') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  Current time for the current block.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Timestamp', 'Now')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Timestamp', 'Now') != null
  }
}

export class TransactionPaymentNextFeeMultiplierStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'NextFeeMultiplier') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'TransactionPayment', 'NextFeeMultiplier')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'NextFeeMultiplier') != null
  }
}

export class TransactionPaymentStorageVersionStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'StorageVersion') === '7a0b9b43fb3e876cfa92bb4b00e569ef9a82972b0600c8a8570e064c7e3890fd'
  }

  async getAsV10000(): Promise<v10000.Releases> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'TransactionPayment', 'StorageVersion')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'StorageVersion') != null
  }
}

export class TreasuryApprovalsStorage {
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
   *  Proposal indices that have been approved but not yet awarded.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Treasury', 'Approvals') === 'a9f6979e68cec9d5834e7d077129aa05e8b477f326cb009049d2178afbea14f0'
  }

  /**
   *  Proposal indices that have been approved but not yet awarded.
   */
  async getAsV10000(): Promise<number[]> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Treasury', 'Approvals')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Treasury', 'Approvals') != null
  }
}

export class TreasuryDeactivatedStorage {
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
   *  The amount which has been reported as inactive to Currency.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Treasury', 'Deactivated') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The amount which has been reported as inactive to Currency.
   */
  async getAsV10000(): Promise<bigint> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Treasury', 'Deactivated')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Treasury', 'Deactivated') != null
  }
}

export class TreasuryProposalCountStorage {
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
   *  Number of proposals that have been made.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Treasury', 'ProposalCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Number of proposals that have been made.
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Treasury', 'ProposalCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Treasury', 'ProposalCount') != null
  }
}

export class TreasuryProposalsStorage {
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
   *  Proposals that have been made.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Treasury', 'Proposals') === '7641e66c93ee52b69acfed5b20da999d04ba6a21fac610732405be939e87d4b7'
  }

  /**
   *  Proposals that have been made.
   */
  async getAsV10000(key: number): Promise<v10000.Proposal | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Treasury', 'Proposals', key)
  }

  async getManyAsV10000(keys: number[]): Promise<(v10000.Proposal | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Treasury', 'Proposals', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.Proposal)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Treasury', 'Proposals')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Treasury', 'Proposals') != null
  }
}

export class VestingStorageVersionStorage {
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
   *  Storage version of the pallet.
   * 
   *  New networks start with latest version, as determined by the genesis build.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Vesting', 'StorageVersion') === '5370c514276f3735e13df7db1f1bbacaba918c365a3ed949597f7ce091eeb77e'
  }

  /**
   *  Storage version of the pallet.
   * 
   *  New networks start with latest version, as determined by the genesis build.
   */
  async getAsV10000(): Promise<v10000.Type_523> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Vesting', 'StorageVersion')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Vesting', 'StorageVersion') != null
  }
}

export class VestingVestingStorage {
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
   *  Information regarding the vesting of a given account.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('Vesting', 'Vesting') === '22ac0db91087ba9b3f5dee769d5e3398f8c8c045cabf7f6585992df66dba74db'
  }

  /**
   *  Information regarding the vesting of a given account.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.VestingInfo[] | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Vesting', 'Vesting', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.VestingInfo[] | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Vesting', 'Vesting', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.VestingInfo[])[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Vesting', 'Vesting')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Vesting', 'Vesting') != null
  }
}

export class VoterListCounterForListNodesStorage {
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
   * Counter for the related counted storage map
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('VoterList', 'CounterForListNodes') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   * Counter for the related counted storage map
   */
  async getAsV10000(): Promise<number> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'VoterList', 'CounterForListNodes')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('VoterList', 'CounterForListNodes') != null
  }
}

export class VoterListListBagsStorage {
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
   *  A bag stored in storage.
   * 
   *  Stores a `Bag` struct, which stores head and tail pointers to itself.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('VoterList', 'ListBags') === '5e403bdbad581142351437d955e87280596a0c5b07d7b18a98a2f9d2fb3469cf'
  }

  /**
   *  A bag stored in storage.
   * 
   *  Stores a `Bag` struct, which stores head and tail pointers to itself.
   */
  async getAsV10000(key: bigint): Promise<v10000.Bag | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'VoterList', 'ListBags', key)
  }

  async getManyAsV10000(keys: bigint[]): Promise<(v10000.Bag | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'VoterList', 'ListBags', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.Bag)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'VoterList', 'ListBags')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('VoterList', 'ListBags') != null
  }
}

export class VoterListListNodesStorage {
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
   *  A single node, within some bag.
   * 
   *  Nodes store links forward and back within their respective bags.
   */
  get isV10000() {
    return this._chain.getStorageItemTypeHash('VoterList', 'ListNodes') === 'd750de9f70dc579f36482219336f529b62912998b5a4be0a48c69cf3c6158042'
  }

  /**
   *  A single node, within some bag.
   * 
   *  Nodes store links forward and back within their respective bags.
   */
  async getAsV10000(key: Uint8Array): Promise<v10000.Node | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'VoterList', 'ListNodes', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(v10000.Node | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'VoterList', 'ListNodes', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(v10000.Node)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'VoterList', 'ListNodes')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('VoterList', 'ListNodes') != null
  }
}

export class WhitelistWhitelistedCallStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV10000() {
    return this._chain.getStorageItemTypeHash('Whitelist', 'WhitelistedCall') === '29735300dba5135be0e1e53d771089aba86ed92479018d68d31c9d66cb9816e3'
  }

  async getAsV10000(key: Uint8Array): Promise<null | undefined> {
    assert(this.isV10000)
    return this._chain.getStorage(this.blockHash, 'Whitelist', 'WhitelistedCall', key)
  }

  async getManyAsV10000(keys: Uint8Array[]): Promise<(null | undefined)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Whitelist', 'WhitelistedCall', keys.map(k => [k]))
  }

  async getAllAsV10000(): Promise<(null)[]> {
    assert(this.isV10000)
    return this._chain.queryStorage(this.blockHash, 'Whitelist', 'WhitelistedCall')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Whitelist', 'WhitelistedCall') != null
  }
}
