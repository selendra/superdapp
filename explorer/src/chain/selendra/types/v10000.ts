import type {Result} from './support'

export type MultiAddress = MultiAddress_Id | MultiAddress_Index | MultiAddress_Raw | MultiAddress_Address32 | MultiAddress_Address20

export interface MultiAddress_Id {
  __kind: 'Id'
  value: Uint8Array
}

export interface MultiAddress_Index {
  __kind: 'Index'
  value: null
}

export interface MultiAddress_Raw {
  __kind: 'Raw'
  value: Uint8Array
}

export interface MultiAddress_Address32 {
  __kind: 'Address32'
  value: Uint8Array
}

export interface MultiAddress_Address20 {
  __kind: 'Address20'
  value: Uint8Array
}

export type Data = Data_None | Data_Raw0 | Data_Raw1 | Data_Raw2 | Data_Raw3 | Data_Raw4 | Data_Raw5 | Data_Raw6 | Data_Raw7 | Data_Raw8 | Data_Raw9 | Data_Raw10 | Data_Raw11 | Data_Raw12 | Data_Raw13 | Data_Raw14 | Data_Raw15 | Data_Raw16 | Data_Raw17 | Data_Raw18 | Data_Raw19 | Data_Raw20 | Data_Raw21 | Data_Raw22 | Data_Raw23 | Data_Raw24 | Data_Raw25 | Data_Raw26 | Data_Raw27 | Data_Raw28 | Data_Raw29 | Data_Raw30 | Data_Raw31 | Data_Raw32 | Data_BlakeTwo256 | Data_Sha256 | Data_Keccak256 | Data_ShaThree256

export interface Data_None {
  __kind: 'None'
}

export interface Data_Raw0 {
  __kind: 'Raw0'
  value: Uint8Array
}

export interface Data_Raw1 {
  __kind: 'Raw1'
  value: Uint8Array
}

export interface Data_Raw2 {
  __kind: 'Raw2'
  value: Uint8Array
}

export interface Data_Raw3 {
  __kind: 'Raw3'
  value: Uint8Array
}

export interface Data_Raw4 {
  __kind: 'Raw4'
  value: Uint8Array
}

export interface Data_Raw5 {
  __kind: 'Raw5'
  value: Uint8Array
}

export interface Data_Raw6 {
  __kind: 'Raw6'
  value: Uint8Array
}

export interface Data_Raw7 {
  __kind: 'Raw7'
  value: Uint8Array
}

export interface Data_Raw8 {
  __kind: 'Raw8'
  value: Uint8Array
}

export interface Data_Raw9 {
  __kind: 'Raw9'
  value: Uint8Array
}

export interface Data_Raw10 {
  __kind: 'Raw10'
  value: Uint8Array
}

export interface Data_Raw11 {
  __kind: 'Raw11'
  value: Uint8Array
}

export interface Data_Raw12 {
  __kind: 'Raw12'
  value: Uint8Array
}

export interface Data_Raw13 {
  __kind: 'Raw13'
  value: Uint8Array
}

export interface Data_Raw14 {
  __kind: 'Raw14'
  value: Uint8Array
}

export interface Data_Raw15 {
  __kind: 'Raw15'
  value: Uint8Array
}

export interface Data_Raw16 {
  __kind: 'Raw16'
  value: Uint8Array
}

export interface Data_Raw17 {
  __kind: 'Raw17'
  value: Uint8Array
}

export interface Data_Raw18 {
  __kind: 'Raw18'
  value: Uint8Array
}

export interface Data_Raw19 {
  __kind: 'Raw19'
  value: Uint8Array
}

export interface Data_Raw20 {
  __kind: 'Raw20'
  value: Uint8Array
}

export interface Data_Raw21 {
  __kind: 'Raw21'
  value: Uint8Array
}

export interface Data_Raw22 {
  __kind: 'Raw22'
  value: Uint8Array
}

export interface Data_Raw23 {
  __kind: 'Raw23'
  value: Uint8Array
}

export interface Data_Raw24 {
  __kind: 'Raw24'
  value: Uint8Array
}

export interface Data_Raw25 {
  __kind: 'Raw25'
  value: Uint8Array
}

export interface Data_Raw26 {
  __kind: 'Raw26'
  value: Uint8Array
}

export interface Data_Raw27 {
  __kind: 'Raw27'
  value: Uint8Array
}

export interface Data_Raw28 {
  __kind: 'Raw28'
  value: Uint8Array
}

export interface Data_Raw29 {
  __kind: 'Raw29'
  value: Uint8Array
}

export interface Data_Raw30 {
  __kind: 'Raw30'
  value: Uint8Array
}

export interface Data_Raw31 {
  __kind: 'Raw31'
  value: Uint8Array
}

export interface Data_Raw32 {
  __kind: 'Raw32'
  value: Uint8Array
}

export interface Data_BlakeTwo256 {
  __kind: 'BlakeTwo256'
  value: Uint8Array
}

export interface Data_Sha256 {
  __kind: 'Sha256'
  value: Uint8Array
}

export interface Data_Keccak256 {
  __kind: 'Keccak256'
  value: Uint8Array
}

export interface Data_ShaThree256 {
  __kind: 'ShaThree256'
  value: Uint8Array
}

export type Judgement = Judgement_Unknown | Judgement_FeePaid | Judgement_Reasonable | Judgement_KnownGood | Judgement_OutOfDate | Judgement_LowQuality | Judgement_Erroneous

export interface Judgement_Unknown {
  __kind: 'Unknown'
}

export interface Judgement_FeePaid {
  __kind: 'FeePaid'
  value: bigint
}

export interface Judgement_Reasonable {
  __kind: 'Reasonable'
}

export interface Judgement_KnownGood {
  __kind: 'KnownGood'
}

export interface Judgement_OutOfDate {
  __kind: 'OutOfDate'
}

export interface Judgement_LowQuality {
  __kind: 'LowQuality'
}

export interface Judgement_Erroneous {
  __kind: 'Erroneous'
}

export interface IdentityInfo {
  additional: [Data, Data][]
  display: Data
  legal: Data
  web: Data
  riot: Data
  email: Data
  pgpFingerprint: (Uint8Array | undefined)
  image: Data
  twitter: Data
}

export interface AssetAccount {
  balance: bigint
  status: AccountStatus
  reason: ExistenceReason
}

export interface Approval {
  amount: bigint
  deposit: bigint
}

export interface AssetDetails {
  owner: Uint8Array
  issuer: Uint8Array
  admin: Uint8Array
  freezer: Uint8Array
  supply: bigint
  deposit: bigint
  minBalance: bigint
  isSufficient: boolean
  accounts: number
  sufficients: number
  approvals: number
  status: AssetStatus
}

export interface AssetMetadata {
  deposit: bigint
  name: Uint8Array
  symbol: Uint8Array
  decimals: number
  isFrozen: boolean
}

export interface BabeEpochConfiguration {
  c: [bigint, bigint]
  allowedSlots: AllowedSlots
}

export type PreDigest = PreDigest_Primary | PreDigest_SecondaryPlain | PreDigest_SecondaryVRF

export interface PreDigest_Primary {
  __kind: 'Primary'
  value: PrimaryPreDigest
}

export interface PreDigest_SecondaryPlain {
  __kind: 'SecondaryPlain'
  value: SecondaryPlainPreDigest
}

export interface PreDigest_SecondaryVRF {
  __kind: 'SecondaryVRF'
  value: SecondaryVRFPreDigest
}

export type NextConfigDescriptor = NextConfigDescriptor_V1

export interface NextConfigDescriptor_V1 {
  __kind: 'V1'
  c: [bigint, bigint]
  allowedSlots: AllowedSlots
}

export interface AccountData {
  free: bigint
  reserved: bigint
  frozen: bigint
  flags: bigint
}

export interface Type_356 {
  amount: bigint
}

export interface IdAmount {
  id: RuntimeHoldReason
  amount: bigint
}

export interface BalanceLock {
  id: Uint8Array
  amount: bigint
  reasons: Reasons
}

export interface ReserveData {
  id: Uint8Array
  amount: bigint
}

export interface Bounty {
  proposer: Uint8Array
  value: bigint
  fee: bigint
  curatorDeposit: bigint
  bond: bigint
  status: BountyStatus
}

export interface ChildBounty {
  parentBounty: number
  value: bigint
  fee: bigint
  curatorDeposit: bigint
  status: ChildBountyStatus
}

export interface CodeInfo {
  owner: Uint8Array
  deposit: bigint
  refcount: bigint
  determinism: Determinism
  codeLen: number
}

export interface ContractInfo {
  trieId: Uint8Array
  depositAccount: Uint8Array
  codeHash: Uint8Array
  storageBytes: number
  storageItems: number
  storageByteDeposit: bigint
  storageItemDeposit: bigint
  storageBaseDeposit: bigint
}

export interface DeletionQueueManager {
  insertCounter: number
  deleteCounter: number
}

export type Voting = Voting_Casting | Voting_Delegating

export interface Voting_Casting {
  __kind: 'Casting'
  value: Casting
}

export interface Voting_Delegating {
  __kind: 'Delegating'
  value: Delegating
}

export interface CodeMetadata {
  size: bigint
  hash: Uint8Array
}

export type Phase = Phase_Off | Phase_Signed | Phase_Unsigned | Phase_Emergency

export interface Phase_Off {
  __kind: 'Off'
}

export interface Phase_Signed {
  __kind: 'Signed'
}

export interface Phase_Unsigned {
  __kind: 'Unsigned'
  value: [boolean, number]
}

export interface Phase_Emergency {
  __kind: 'Emergency'
}

export interface ElectionScore {
  minimalStake: bigint
  sumStake: bigint
  sumStakeSquared: bigint
}

export interface ReadySolution {
  supports: [Uint8Array, Support][]
  score: ElectionScore
  compute: ElectionCompute
}

export interface SignedSubmission {
  who: Uint8Array
  deposit: bigint
  rawSolution: RawSolution
  callFee: bigint
}

export interface RoundSnapshot {
  voters: [Uint8Array, bigint, Uint8Array[]][]
  targets: Uint8Array[]
}

export interface SolutionOrSnapshotSize {
  voters: number
  targets: number
}

export interface Block {
  header: Type_538
  transactions: TransactionV2[]
  ommers: Type_538[]
}

export type ReceiptV3 = ReceiptV3_Legacy | ReceiptV3_EIP2930 | ReceiptV3_EIP1559

export interface ReceiptV3_Legacy {
  __kind: 'Legacy'
  value: EIP658ReceiptData
}

export interface ReceiptV3_EIP2930 {
  __kind: 'EIP2930'
  value: EIP658ReceiptData
}

export interface ReceiptV3_EIP1559 {
  __kind: 'EIP1559'
  value: EIP658ReceiptData
}

export interface TransactionStatus {
  transactionHash: Uint8Array
  transactionIndex: number
  from: Uint8Array
  to: (Uint8Array | undefined)
  contractAddress: (Uint8Array | undefined)
  logs: Log[]
  logsBloom: Uint8Array
}

export type TransactionV2 = TransactionV2_Legacy | TransactionV2_EIP2930 | TransactionV2_EIP1559

export interface TransactionV2_Legacy {
  __kind: 'Legacy'
  value: LegacyTransaction
}

export interface TransactionV2_EIP2930 {
  __kind: 'EIP2930'
  value: EIP2930Transaction
}

export interface TransactionV2_EIP1559 {
  __kind: 'EIP1559'
  value: EIP1559Transaction
}

export interface UnstakeRequest {
  stashes: [Uint8Array, bigint][]
  checked: number[]
}

export interface StoredPendingChange {
  scheduledAt: number
  delay: number
  nextAuthorities: [Uint8Array, bigint][]
  forced: (number | undefined)
}

export type StoredState = StoredState_Live | StoredState_PendingPause | StoredState_Paused | StoredState_PendingResume

export interface StoredState_Live {
  __kind: 'Live'
}

export interface StoredState_PendingPause {
  __kind: 'PendingPause'
  scheduledAt: number
  delay: number
}

export interface StoredState_Paused {
  __kind: 'Paused'
}

export interface StoredState_PendingResume {
  __kind: 'PendingResume'
  scheduledAt: number
  delay: number
}

export interface Registration {
  judgements: [number, Judgement][]
  deposit: bigint
  info: IdentityInfo
}

export interface RegistrarInfo {
  account: Uint8Array
  fee: bigint
  fields: bigint
}

export interface Multisig {
  when: Timepoint
  deposit: bigint
  depositor: Uint8Array
  approvals: Uint8Array[]
}

export interface OffenceDetails {
  offender: [Uint8Array, Exposure]
  reporters: Uint8Array[]
}

export type RequestStatus = RequestStatus_Unrequested | RequestStatus_Requested

export interface RequestStatus_Unrequested {
  __kind: 'Unrequested'
  deposit: [Uint8Array, bigint]
  len: number
}

export interface RequestStatus_Requested {
  __kind: 'Requested'
  deposit: ([Uint8Array, bigint] | undefined)
  count: number
  len: (number | undefined)
}

export interface Announcement {
  real: Uint8Array
  callHash: Uint8Array
  height: number
}

export interface ProxyDefinition {
  delegate: Uint8Array
  proxyType: ProxyType
  delay: number
}

export interface ActiveRecovery {
  created: number
  deposit: bigint
  friends: Uint8Array[]
}

export interface RecoveryConfig {
  delayPeriod: number
  deposit: bigint
  friends: Uint8Array[]
  threshold: number
}

export type ReferendumInfo = ReferendumInfo_Ongoing | ReferendumInfo_Approved | ReferendumInfo_Rejected | ReferendumInfo_Cancelled | ReferendumInfo_TimedOut | ReferendumInfo_Killed

export interface ReferendumInfo_Ongoing {
  __kind: 'Ongoing'
  value: ReferendumStatus
}

export interface ReferendumInfo_Approved {
  __kind: 'Approved'
  value: [number, (Deposit | undefined), (Deposit | undefined)]
}

export interface ReferendumInfo_Rejected {
  __kind: 'Rejected'
  value: [number, (Deposit | undefined), (Deposit | undefined)]
}

export interface ReferendumInfo_Cancelled {
  __kind: 'Cancelled'
  value: [number, (Deposit | undefined), (Deposit | undefined)]
}

export interface ReferendumInfo_TimedOut {
  __kind: 'TimedOut'
  value: [number, (Deposit | undefined), (Deposit | undefined)]
}

export interface ReferendumInfo_Killed {
  __kind: 'Killed'
  value: number
}

export interface Scheduled {
  maybeId: (Uint8Array | undefined)
  priority: number
  call: Bounded
  maybePeriodic: ([number, number] | undefined)
  origin: OriginCaller
}

export interface SessionKeys {
  babe: Uint8Array
  grandpa: Uint8Array
  imOnline: Uint8Array
  authorityDiscovery: Uint8Array
}

export interface ActiveEraInfo {
  index: number
  start: (bigint | undefined)
}

export interface EraRewardPoints {
  total: number
  individual: [Uint8Array, number][]
}

export interface Exposure {
  total: bigint
  own: bigint
  others: IndividualExposure[]
}

export interface ValidatorPrefs {
  commission: number
  blocked: boolean
}

export type Forcing = Forcing_NotForcing | Forcing_ForceNew | Forcing_ForceNone | Forcing_ForceAlways

export interface Forcing_NotForcing {
  __kind: 'NotForcing'
}

export interface Forcing_ForceNew {
  __kind: 'ForceNew'
}

export interface Forcing_ForceNone {
  __kind: 'ForceNone'
}

export interface Forcing_ForceAlways {
  __kind: 'ForceAlways'
}

export interface StakingLedger {
  stash: Uint8Array
  total: bigint
  active: bigint
  unlocking: UnlockChunk[]
  claimedRewards: number[]
}

export interface Nominations {
  targets: Uint8Array[]
  submittedIn: number
  suppressed: boolean
}

export type RewardDestination = RewardDestination_Staked | RewardDestination_Stash | RewardDestination_Controller | RewardDestination_Account | RewardDestination_None

export interface RewardDestination_Staked {
  __kind: 'Staked'
}

export interface RewardDestination_Stash {
  __kind: 'Stash'
}

export interface RewardDestination_Controller {
  __kind: 'Controller'
}

export interface RewardDestination_Account {
  __kind: 'Account'
  value: Uint8Array
}

export interface RewardDestination_None {
  __kind: 'None'
}

export interface SlashingSpans {
  spanIndex: number
  lastStart: number
  lastNonzeroSlash: number
  prior: number[]
}

export interface SpanRecord {
  slashed: bigint
  paidOut: bigint
}

export interface UnappliedSlash {
  validator: Uint8Array
  own: bigint
  others: [Uint8Array, bigint][]
  reporters: Uint8Array[]
  payout: bigint
}

export interface AccountInfo {
  nonce: number
  consumers: number
  providers: number
  sufficients: number
  data: AccountData
}

export interface PerDispatchClass {
  normal: Weight
  operational: Weight
  mandatory: Weight
}

export interface Digest {
  logs: DigestItem[]
}

export interface EventRecord {
  phase: Type_320
  event: Event
  topics: Uint8Array[]
}

export type Type_320 = Type_320_ApplyExtrinsic | Type_320_Finalization | Type_320_Initialization

export interface Type_320_ApplyExtrinsic {
  __kind: 'ApplyExtrinsic'
  value: number
}

export interface Type_320_Finalization {
  __kind: 'Finalization'
}

export interface Type_320_Initialization {
  __kind: 'Initialization'
}

export interface LastRuntimeUpgradeInfo {
  specVersion: number
  specName: string
}

export type Releases = Releases_V1Ancient | Releases_V2

export interface Releases_V1Ancient {
  __kind: 'V1Ancient'
}

export interface Releases_V2 {
  __kind: 'V2'
}

export interface Proposal {
  proposer: Uint8Array
  value: bigint
  beneficiary: Uint8Array
  bond: bigint
}

export type Type_523 = Type_523_V0 | Type_523_V1

export interface Type_523_V0 {
  __kind: 'V0'
}

export interface Type_523_V1 {
  __kind: 'V1'
}

export interface VestingInfo {
  locked: bigint
  perBlock: bigint
  startingBlock: number
}

export interface Bag {
  head: (Uint8Array | undefined)
  tail: (Uint8Array | undefined)
}

export interface Node {
  id: Uint8Array
  prev: (Uint8Array | undefined)
  next: (Uint8Array | undefined)
  bagUpper: bigint
  score: bigint
}

export type AccountStatus = AccountStatus_Liquid | AccountStatus_Frozen | AccountStatus_Blocked

export interface AccountStatus_Liquid {
  __kind: 'Liquid'
}

export interface AccountStatus_Frozen {
  __kind: 'Frozen'
}

export interface AccountStatus_Blocked {
  __kind: 'Blocked'
}

export type ExistenceReason = ExistenceReason_Consumer | ExistenceReason_Sufficient | ExistenceReason_DepositHeld | ExistenceReason_DepositRefunded | ExistenceReason_DepositFrom

export interface ExistenceReason_Consumer {
  __kind: 'Consumer'
}

export interface ExistenceReason_Sufficient {
  __kind: 'Sufficient'
}

export interface ExistenceReason_DepositHeld {
  __kind: 'DepositHeld'
  value: bigint
}

export interface ExistenceReason_DepositRefunded {
  __kind: 'DepositRefunded'
}

export interface ExistenceReason_DepositFrom {
  __kind: 'DepositFrom'
  value: [Uint8Array, bigint]
}

export type AssetStatus = AssetStatus_Live | AssetStatus_Frozen | AssetStatus_Destroying

export interface AssetStatus_Live {
  __kind: 'Live'
}

export interface AssetStatus_Frozen {
  __kind: 'Frozen'
}

export interface AssetStatus_Destroying {
  __kind: 'Destroying'
}

export type AllowedSlots = AllowedSlots_PrimarySlots | AllowedSlots_PrimaryAndSecondaryPlainSlots | AllowedSlots_PrimaryAndSecondaryVRFSlots

export interface AllowedSlots_PrimarySlots {
  __kind: 'PrimarySlots'
}

export interface AllowedSlots_PrimaryAndSecondaryPlainSlots {
  __kind: 'PrimaryAndSecondaryPlainSlots'
}

export interface AllowedSlots_PrimaryAndSecondaryVRFSlots {
  __kind: 'PrimaryAndSecondaryVRFSlots'
}

export interface PrimaryPreDigest {
  authorityIndex: number
  slot: bigint
  vrfSignature: VrfSignature
}

export interface SecondaryPlainPreDigest {
  authorityIndex: number
  slot: bigint
}

export interface SecondaryVRFPreDigest {
  authorityIndex: number
  slot: bigint
  vrfSignature: VrfSignature
}

export type RuntimeHoldReason = never

export type Reasons = Reasons_Fee | Reasons_Misc | Reasons_All

export interface Reasons_Fee {
  __kind: 'Fee'
}

export interface Reasons_Misc {
  __kind: 'Misc'
}

export interface Reasons_All {
  __kind: 'All'
}

export type BountyStatus = BountyStatus_Proposed | BountyStatus_Approved | BountyStatus_Funded | BountyStatus_CuratorProposed | BountyStatus_Active | BountyStatus_PendingPayout

export interface BountyStatus_Proposed {
  __kind: 'Proposed'
}

export interface BountyStatus_Approved {
  __kind: 'Approved'
}

export interface BountyStatus_Funded {
  __kind: 'Funded'
}

export interface BountyStatus_CuratorProposed {
  __kind: 'CuratorProposed'
  curator: Uint8Array
}

export interface BountyStatus_Active {
  __kind: 'Active'
  curator: Uint8Array
  updateDue: number
}

export interface BountyStatus_PendingPayout {
  __kind: 'PendingPayout'
  curator: Uint8Array
  beneficiary: Uint8Array
  unlockAt: number
}

export type ChildBountyStatus = ChildBountyStatus_Added | ChildBountyStatus_CuratorProposed | ChildBountyStatus_Active | ChildBountyStatus_PendingPayout

export interface ChildBountyStatus_Added {
  __kind: 'Added'
}

export interface ChildBountyStatus_CuratorProposed {
  __kind: 'CuratorProposed'
  curator: Uint8Array
}

export interface ChildBountyStatus_Active {
  __kind: 'Active'
  curator: Uint8Array
}

export interface ChildBountyStatus_PendingPayout {
  __kind: 'PendingPayout'
  curator: Uint8Array
  beneficiary: Uint8Array
  unlockAt: number
}

export type Determinism = Determinism_Enforced | Determinism_Relaxed

export interface Determinism_Enforced {
  __kind: 'Enforced'
}

export interface Determinism_Relaxed {
  __kind: 'Relaxed'
}

export interface Casting {
  votes: [number, AccountVote][]
  delegations: Delegations
  prior: [number, bigint]
}

export interface Delegating {
  balance: bigint
  target: Uint8Array
  conviction: Conviction
  delegations: Delegations
  prior: [number, bigint]
}

export interface Support {
  total: bigint
  voters: [Uint8Array, bigint][]
}

export type ElectionCompute = ElectionCompute_OnChain | ElectionCompute_Signed | ElectionCompute_Unsigned | ElectionCompute_Fallback | ElectionCompute_Emergency

export interface ElectionCompute_OnChain {
  __kind: 'OnChain'
}

export interface ElectionCompute_Signed {
  __kind: 'Signed'
}

export interface ElectionCompute_Unsigned {
  __kind: 'Unsigned'
}

export interface ElectionCompute_Fallback {
  __kind: 'Fallback'
}

export interface ElectionCompute_Emergency {
  __kind: 'Emergency'
}

export interface RawSolution {
  solution: NposCompactSolution16
  score: ElectionScore
  round: number
}

export interface Type_538 {
  parentHash: Uint8Array
  ommersHash: Uint8Array
  beneficiary: Uint8Array
  stateRoot: Uint8Array
  transactionsRoot: Uint8Array
  receiptsRoot: Uint8Array
  logsBloom: Uint8Array
  difficulty: bigint[]
  number: bigint[]
  gasLimit: bigint[]
  gasUsed: bigint[]
  timestamp: bigint
  extraData: Uint8Array
  mixHash: Uint8Array
  nonce: Uint8Array
}

export interface EIP658ReceiptData {
  statusCode: number
  usedGas: bigint[]
  logsBloom: Uint8Array
  logs: Log[]
}

export interface Log {
  address: Uint8Array
  topics: Uint8Array[]
  data: Uint8Array
}

export interface LegacyTransaction {
  nonce: bigint[]
  gasPrice: bigint[]
  gasLimit: bigint[]
  action: TransactionAction
  value: bigint[]
  input: Uint8Array
  signature: TransactionSignature
}

export interface EIP2930Transaction {
  chainId: bigint
  nonce: bigint[]
  gasPrice: bigint[]
  gasLimit: bigint[]
  action: TransactionAction
  value: bigint[]
  input: Uint8Array
  accessList: AccessListItem[]
  oddYParity: boolean
  r: Uint8Array
  s: Uint8Array
}

export interface EIP1559Transaction {
  chainId: bigint
  nonce: bigint[]
  maxPriorityFeePerGas: bigint[]
  maxFeePerGas: bigint[]
  gasLimit: bigint[]
  action: TransactionAction
  value: bigint[]
  input: Uint8Array
  accessList: AccessListItem[]
  oddYParity: boolean
  r: Uint8Array
  s: Uint8Array
}

export interface Timepoint {
  height: number
  index: number
}

export type ProxyType = ProxyType_Any | ProxyType_NonTransfer | ProxyType_Governance | ProxyType_Staking | ProxyType_IdentityJudgement | ProxyType_CancelProxy

export interface ProxyType_Any {
  __kind: 'Any'
}

export interface ProxyType_NonTransfer {
  __kind: 'NonTransfer'
}

export interface ProxyType_Governance {
  __kind: 'Governance'
}

export interface ProxyType_Staking {
  __kind: 'Staking'
}

export interface ProxyType_IdentityJudgement {
  __kind: 'IdentityJudgement'
}

export interface ProxyType_CancelProxy {
  __kind: 'CancelProxy'
}

export interface ReferendumStatus {
  track: number
  origin: OriginCaller
  proposal: Bounded
  enactment: DispatchTime
  submitted: number
  submissionDeposit: Deposit
  decisionDeposit: (Deposit | undefined)
  deciding: (DecidingStatus | undefined)
  tally: Tally
  inQueue: boolean
  alarm: ([number, [number, number]] | undefined)
}

export interface Deposit {
  who: Uint8Array
  amount: bigint
}

export type Bounded = Bounded_Legacy | Bounded_Inline | Bounded_Lookup

export interface Bounded_Legacy {
  __kind: 'Legacy'
  hash: Uint8Array
}

export interface Bounded_Inline {
  __kind: 'Inline'
  value: Uint8Array
}

export interface Bounded_Lookup {
  __kind: 'Lookup'
  hash: Uint8Array
  len: number
}

export type OriginCaller = OriginCaller_system | OriginCaller_Origins | OriginCaller_Ethereum | OriginCaller_Void

export interface OriginCaller_system {
  __kind: 'system'
  value: RawOrigin
}

export interface OriginCaller_Origins {
  __kind: 'Origins'
  value: Origin
}

export interface OriginCaller_Ethereum {
  __kind: 'Ethereum'
  value: Type_202
}

export interface OriginCaller_Void {
  __kind: 'Void'
  value: Void
}

export interface IndividualExposure {
  who: Uint8Array
  value: bigint
}

export interface UnlockChunk {
  value: bigint
  era: number
}

export interface Weight {
  refTime: bigint
  proofSize: bigint
}

export type DigestItem = DigestItem_PreRuntime | DigestItem_Consensus | DigestItem_Seal | DigestItem_Other | DigestItem_RuntimeEnvironmentUpdated

export interface DigestItem_PreRuntime {
  __kind: 'PreRuntime'
  value: [Uint8Array, Uint8Array]
}

export interface DigestItem_Consensus {
  __kind: 'Consensus'
  value: [Uint8Array, Uint8Array]
}

export interface DigestItem_Seal {
  __kind: 'Seal'
  value: [Uint8Array, Uint8Array]
}

export interface DigestItem_Other {
  __kind: 'Other'
  value: Uint8Array
}

export interface DigestItem_RuntimeEnvironmentUpdated {
  __kind: 'RuntimeEnvironmentUpdated'
}

export type Event = Event_System | Event_Scheduler | Event_Preimage | Event_Balances | Event_TransactionPayment | Event_Assets | Event_Staking | Event_Offences | Event_Session | Event_Grandpa | Event_ImOnline | Event_ElectionProviderMultiPhase | Event_VoterList | Event_FastUnstake | Event_Treasury | Event_ConvictionVoting | Event_Referenda | Event_Whitelist | Event_Bounties | Event_ChildBounties | Event_Utility | Event_Multisig | Event_Recovery | Event_Proxy | Event_Indices | Event_Identity | Event_Vesting | Event_EVM | Event_Ethereum | Event_BaseFee | Event_EthCall | Event_Contracts | Event_Sudo

export interface Event_System {
  __kind: 'System'
  value: SystemEvent
}

export interface Event_Scheduler {
  __kind: 'Scheduler'
  value: SchedulerEvent
}

export interface Event_Preimage {
  __kind: 'Preimage'
  value: PreimageEvent
}

export interface Event_Balances {
  __kind: 'Balances'
  value: BalancesEvent
}

export interface Event_TransactionPayment {
  __kind: 'TransactionPayment'
  value: TransactionPaymentEvent
}

export interface Event_Assets {
  __kind: 'Assets'
  value: AssetsEvent
}

export interface Event_Staking {
  __kind: 'Staking'
  value: StakingEvent
}

export interface Event_Offences {
  __kind: 'Offences'
  value: OffencesEvent
}

export interface Event_Session {
  __kind: 'Session'
  value: SessionEvent
}

export interface Event_Grandpa {
  __kind: 'Grandpa'
  value: GrandpaEvent
}

export interface Event_ImOnline {
  __kind: 'ImOnline'
  value: ImOnlineEvent
}

export interface Event_ElectionProviderMultiPhase {
  __kind: 'ElectionProviderMultiPhase'
  value: ElectionProviderMultiPhaseEvent
}

export interface Event_VoterList {
  __kind: 'VoterList'
  value: VoterListEvent
}

export interface Event_FastUnstake {
  __kind: 'FastUnstake'
  value: FastUnstakeEvent
}

export interface Event_Treasury {
  __kind: 'Treasury'
  value: TreasuryEvent
}

export interface Event_ConvictionVoting {
  __kind: 'ConvictionVoting'
  value: ConvictionVotingEvent
}

export interface Event_Referenda {
  __kind: 'Referenda'
  value: ReferendaEvent
}

export interface Event_Whitelist {
  __kind: 'Whitelist'
  value: WhitelistEvent
}

export interface Event_Bounties {
  __kind: 'Bounties'
  value: BountiesEvent
}

export interface Event_ChildBounties {
  __kind: 'ChildBounties'
  value: ChildBountiesEvent
}

export interface Event_Utility {
  __kind: 'Utility'
  value: UtilityEvent
}

export interface Event_Multisig {
  __kind: 'Multisig'
  value: MultisigEvent
}

export interface Event_Recovery {
  __kind: 'Recovery'
  value: RecoveryEvent
}

export interface Event_Proxy {
  __kind: 'Proxy'
  value: ProxyEvent
}

export interface Event_Indices {
  __kind: 'Indices'
  value: IndicesEvent
}

export interface Event_Identity {
  __kind: 'Identity'
  value: IdentityEvent
}

export interface Event_Vesting {
  __kind: 'Vesting'
  value: VestingEvent
}

export interface Event_EVM {
  __kind: 'EVM'
  value: EVMEvent
}

export interface Event_Ethereum {
  __kind: 'Ethereum'
  value: EthereumEvent
}

export interface Event_BaseFee {
  __kind: 'BaseFee'
  value: BaseFeeEvent
}

export interface Event_EthCall {
  __kind: 'EthCall'
  value: EthCallEvent
}

export interface Event_Contracts {
  __kind: 'Contracts'
  value: ContractsEvent
}

export interface Event_Sudo {
  __kind: 'Sudo'
  value: SudoEvent
}

export interface VrfSignature {
  output: Uint8Array
  proof: Uint8Array
}

export type AccountVote = AccountVote_Standard | AccountVote_Split | AccountVote_SplitAbstain

export interface AccountVote_Standard {
  __kind: 'Standard'
  vote: number
  balance: bigint
}

export interface AccountVote_Split {
  __kind: 'Split'
  aye: bigint
  nay: bigint
}

export interface AccountVote_SplitAbstain {
  __kind: 'SplitAbstain'
  aye: bigint
  nay: bigint
  abstain: bigint
}

export interface Delegations {
  votes: bigint
  capital: bigint
}

export type Conviction = Conviction_None | Conviction_Locked1x | Conviction_Locked2x | Conviction_Locked3x | Conviction_Locked4x | Conviction_Locked5x | Conviction_Locked6x

export interface Conviction_None {
  __kind: 'None'
}

export interface Conviction_Locked1x {
  __kind: 'Locked1x'
}

export interface Conviction_Locked2x {
  __kind: 'Locked2x'
}

export interface Conviction_Locked3x {
  __kind: 'Locked3x'
}

export interface Conviction_Locked4x {
  __kind: 'Locked4x'
}

export interface Conviction_Locked5x {
  __kind: 'Locked5x'
}

export interface Conviction_Locked6x {
  __kind: 'Locked6x'
}

export interface NposCompactSolution16 {
  votes1: [number, number][]
  votes2: [number, [number, number], number][]
  votes3: [number, [number, number][], number][]
  votes4: [number, [number, number][], number][]
  votes5: [number, [number, number][], number][]
  votes6: [number, [number, number][], number][]
  votes7: [number, [number, number][], number][]
  votes8: [number, [number, number][], number][]
  votes9: [number, [number, number][], number][]
  votes10: [number, [number, number][], number][]
  votes11: [number, [number, number][], number][]
  votes12: [number, [number, number][], number][]
  votes13: [number, [number, number][], number][]
  votes14: [number, [number, number][], number][]
  votes15: [number, [number, number][], number][]
  votes16: [number, [number, number][], number][]
}

export type TransactionAction = TransactionAction_Call | TransactionAction_Create

export interface TransactionAction_Call {
  __kind: 'Call'
  value: Uint8Array
}

export interface TransactionAction_Create {
  __kind: 'Create'
}

export interface TransactionSignature {
  v: bigint
  r: Uint8Array
  s: Uint8Array
}

export interface AccessListItem {
  address: Uint8Array
  storageKeys: Uint8Array[]
}

export type DispatchTime = DispatchTime_At | DispatchTime_After

export interface DispatchTime_At {
  __kind: 'At'
  value: number
}

export interface DispatchTime_After {
  __kind: 'After'
  value: number
}

export interface DecidingStatus {
  since: number
  confirming: (number | undefined)
}

export interface Tally {
  ayes: bigint
  nays: bigint
  support: bigint
}

export type RawOrigin = RawOrigin_Root | RawOrigin_Signed | RawOrigin_None

export interface RawOrigin_Root {
  __kind: 'Root'
}

export interface RawOrigin_Signed {
  __kind: 'Signed'
  value: Uint8Array
}

export interface RawOrigin_None {
  __kind: 'None'
}

export type Origin = Origin_StakingAdmin | Origin_Treasurer | Origin_FellowshipAdmin | Origin_GeneralAdmin | Origin_ReferendumCanceller | Origin_ReferendumKiller | Origin_SmallTipper | Origin_BigTipper | Origin_SmallSpender | Origin_MediumSpender | Origin_BigSpender | Origin_WhitelistedCaller

export interface Origin_StakingAdmin {
  __kind: 'StakingAdmin'
}

export interface Origin_Treasurer {
  __kind: 'Treasurer'
}

export interface Origin_FellowshipAdmin {
  __kind: 'FellowshipAdmin'
}

export interface Origin_GeneralAdmin {
  __kind: 'GeneralAdmin'
}

export interface Origin_ReferendumCanceller {
  __kind: 'ReferendumCanceller'
}

export interface Origin_ReferendumKiller {
  __kind: 'ReferendumKiller'
}

export interface Origin_SmallTipper {
  __kind: 'SmallTipper'
}

export interface Origin_BigTipper {
  __kind: 'BigTipper'
}

export interface Origin_SmallSpender {
  __kind: 'SmallSpender'
}

export interface Origin_MediumSpender {
  __kind: 'MediumSpender'
}

export interface Origin_BigSpender {
  __kind: 'BigSpender'
}

export interface Origin_WhitelistedCaller {
  __kind: 'WhitelistedCaller'
}

export type Type_202 = Type_202_EthereumTransaction

export interface Type_202_EthereumTransaction {
  __kind: 'EthereumTransaction'
  value: Uint8Array
}

export type Void = never

/**
 * Event for the System pallet.
 */
export type SystemEvent = SystemEvent_ExtrinsicSuccess | SystemEvent_ExtrinsicFailed | SystemEvent_CodeUpdated | SystemEvent_NewAccount | SystemEvent_KilledAccount | SystemEvent_Remarked

/**
 * An extrinsic completed successfully.
 */
export interface SystemEvent_ExtrinsicSuccess {
  __kind: 'ExtrinsicSuccess'
  dispatchInfo: DispatchInfo
}

/**
 * An extrinsic failed.
 */
export interface SystemEvent_ExtrinsicFailed {
  __kind: 'ExtrinsicFailed'
  dispatchError: DispatchError
  dispatchInfo: DispatchInfo
}

/**
 * `:code` was updated.
 */
export interface SystemEvent_CodeUpdated {
  __kind: 'CodeUpdated'
}

/**
 * A new account was created.
 */
export interface SystemEvent_NewAccount {
  __kind: 'NewAccount'
  account: Uint8Array
}

/**
 * An account was reaped.
 */
export interface SystemEvent_KilledAccount {
  __kind: 'KilledAccount'
  account: Uint8Array
}

/**
 * On on-chain remark happened.
 */
export interface SystemEvent_Remarked {
  __kind: 'Remarked'
  sender: Uint8Array
  hash: Uint8Array
}

/**
 * Events type.
 */
export type SchedulerEvent = SchedulerEvent_Scheduled | SchedulerEvent_Canceled | SchedulerEvent_Dispatched | SchedulerEvent_CallUnavailable | SchedulerEvent_PeriodicFailed | SchedulerEvent_PermanentlyOverweight

/**
 * Scheduled some task.
 */
export interface SchedulerEvent_Scheduled {
  __kind: 'Scheduled'
  when: number
  index: number
}

/**
 * Canceled some task.
 */
export interface SchedulerEvent_Canceled {
  __kind: 'Canceled'
  when: number
  index: number
}

/**
 * Dispatched some task.
 */
export interface SchedulerEvent_Dispatched {
  __kind: 'Dispatched'
  task: [number, number]
  id: (Uint8Array | undefined)
  result: Result<null, DispatchError>
}

/**
 * The call for the provided hash was not found so the task has been aborted.
 */
export interface SchedulerEvent_CallUnavailable {
  __kind: 'CallUnavailable'
  task: [number, number]
  id: (Uint8Array | undefined)
}

/**
 * The given task was unable to be renewed since the agenda is full at that block.
 */
export interface SchedulerEvent_PeriodicFailed {
  __kind: 'PeriodicFailed'
  task: [number, number]
  id: (Uint8Array | undefined)
}

/**
 * The given task can never be executed since it is overweight.
 */
export interface SchedulerEvent_PermanentlyOverweight {
  __kind: 'PermanentlyOverweight'
  task: [number, number]
  id: (Uint8Array | undefined)
}

/**
 * The `Event` enum of this pallet
 */
export type PreimageEvent = PreimageEvent_Noted | PreimageEvent_Requested | PreimageEvent_Cleared

/**
 * A preimage has been noted.
 */
export interface PreimageEvent_Noted {
  __kind: 'Noted'
  hash: Uint8Array
}

/**
 * A preimage has been requested.
 */
export interface PreimageEvent_Requested {
  __kind: 'Requested'
  hash: Uint8Array
}

/**
 * A preimage has ben cleared.
 */
export interface PreimageEvent_Cleared {
  __kind: 'Cleared'
  hash: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type BalancesEvent = BalancesEvent_Endowed | BalancesEvent_DustLost | BalancesEvent_Transfer | BalancesEvent_BalanceSet | BalancesEvent_Reserved | BalancesEvent_Unreserved | BalancesEvent_ReserveRepatriated | BalancesEvent_Deposit | BalancesEvent_Withdraw | BalancesEvent_Slashed | BalancesEvent_Minted | BalancesEvent_Burned | BalancesEvent_Suspended | BalancesEvent_Restored | BalancesEvent_Upgraded | BalancesEvent_Issued | BalancesEvent_Rescinded | BalancesEvent_Locked | BalancesEvent_Unlocked | BalancesEvent_Frozen | BalancesEvent_Thawed

/**
 * An account was created with some free balance.
 */
export interface BalancesEvent_Endowed {
  __kind: 'Endowed'
  account: Uint8Array
  freeBalance: bigint
}

/**
 * An account was removed whose balance was non-zero but below ExistentialDeposit,
 * resulting in an outright loss.
 */
export interface BalancesEvent_DustLost {
  __kind: 'DustLost'
  account: Uint8Array
  amount: bigint
}

/**
 * Transfer succeeded.
 */
export interface BalancesEvent_Transfer {
  __kind: 'Transfer'
  from: Uint8Array
  to: Uint8Array
  amount: bigint
}

/**
 * A balance was set by root.
 */
export interface BalancesEvent_BalanceSet {
  __kind: 'BalanceSet'
  who: Uint8Array
  free: bigint
}

/**
 * Some balance was reserved (moved from free to reserved).
 */
export interface BalancesEvent_Reserved {
  __kind: 'Reserved'
  who: Uint8Array
  amount: bigint
}

/**
 * Some balance was unreserved (moved from reserved to free).
 */
export interface BalancesEvent_Unreserved {
  __kind: 'Unreserved'
  who: Uint8Array
  amount: bigint
}

/**
 * Some balance was moved from the reserve of the first account to the second account.
 * Final argument indicates the destination balance type.
 */
export interface BalancesEvent_ReserveRepatriated {
  __kind: 'ReserveRepatriated'
  from: Uint8Array
  to: Uint8Array
  amount: bigint
  destinationStatus: BalanceStatus
}

/**
 * Some amount was deposited (e.g. for transaction fees).
 */
export interface BalancesEvent_Deposit {
  __kind: 'Deposit'
  who: Uint8Array
  amount: bigint
}

/**
 * Some amount was withdrawn from the account (e.g. for transaction fees).
 */
export interface BalancesEvent_Withdraw {
  __kind: 'Withdraw'
  who: Uint8Array
  amount: bigint
}

/**
 * Some amount was removed from the account (e.g. for misbehavior).
 */
export interface BalancesEvent_Slashed {
  __kind: 'Slashed'
  who: Uint8Array
  amount: bigint
}

/**
 * Some amount was minted into an account.
 */
export interface BalancesEvent_Minted {
  __kind: 'Minted'
  who: Uint8Array
  amount: bigint
}

/**
 * Some amount was burned from an account.
 */
export interface BalancesEvent_Burned {
  __kind: 'Burned'
  who: Uint8Array
  amount: bigint
}

/**
 * Some amount was suspended from an account (it can be restored later).
 */
export interface BalancesEvent_Suspended {
  __kind: 'Suspended'
  who: Uint8Array
  amount: bigint
}

/**
 * Some amount was restored into an account.
 */
export interface BalancesEvent_Restored {
  __kind: 'Restored'
  who: Uint8Array
  amount: bigint
}

/**
 * An account was upgraded.
 */
export interface BalancesEvent_Upgraded {
  __kind: 'Upgraded'
  who: Uint8Array
}

/**
 * Total issuance was increased by `amount`, creating a credit to be balanced.
 */
export interface BalancesEvent_Issued {
  __kind: 'Issued'
  amount: bigint
}

/**
 * Total issuance was decreased by `amount`, creating a debt to be balanced.
 */
export interface BalancesEvent_Rescinded {
  __kind: 'Rescinded'
  amount: bigint
}

/**
 * Some balance was locked.
 */
export interface BalancesEvent_Locked {
  __kind: 'Locked'
  who: Uint8Array
  amount: bigint
}

/**
 * Some balance was unlocked.
 */
export interface BalancesEvent_Unlocked {
  __kind: 'Unlocked'
  who: Uint8Array
  amount: bigint
}

/**
 * Some balance was frozen.
 */
export interface BalancesEvent_Frozen {
  __kind: 'Frozen'
  who: Uint8Array
  amount: bigint
}

/**
 * Some balance was thawed.
 */
export interface BalancesEvent_Thawed {
  __kind: 'Thawed'
  who: Uint8Array
  amount: bigint
}

/**
 * The `Event` enum of this pallet
 */
export type TransactionPaymentEvent = TransactionPaymentEvent_TransactionFeePaid

/**
 * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
 * has been paid by `who`.
 */
export interface TransactionPaymentEvent_TransactionFeePaid {
  __kind: 'TransactionFeePaid'
  who: Uint8Array
  actualFee: bigint
  tip: bigint
}

/**
 * The `Event` enum of this pallet
 */
export type AssetsEvent = AssetsEvent_Created | AssetsEvent_Issued | AssetsEvent_Transferred | AssetsEvent_Burned | AssetsEvent_TeamChanged | AssetsEvent_OwnerChanged | AssetsEvent_Frozen | AssetsEvent_Thawed | AssetsEvent_AssetFrozen | AssetsEvent_AssetThawed | AssetsEvent_AccountsDestroyed | AssetsEvent_ApprovalsDestroyed | AssetsEvent_DestructionStarted | AssetsEvent_Destroyed | AssetsEvent_ForceCreated | AssetsEvent_MetadataSet | AssetsEvent_MetadataCleared | AssetsEvent_ApprovedTransfer | AssetsEvent_ApprovalCancelled | AssetsEvent_TransferredApproved | AssetsEvent_AssetStatusChanged | AssetsEvent_AssetMinBalanceChanged | AssetsEvent_Touched | AssetsEvent_Blocked

/**
 * Some asset class was created.
 */
export interface AssetsEvent_Created {
  __kind: 'Created'
  assetId: bigint
  creator: Uint8Array
  owner: Uint8Array
}

/**
 * Some assets were issued.
 */
export interface AssetsEvent_Issued {
  __kind: 'Issued'
  assetId: bigint
  owner: Uint8Array
  amount: bigint
}

/**
 * Some assets were transferred.
 */
export interface AssetsEvent_Transferred {
  __kind: 'Transferred'
  assetId: bigint
  from: Uint8Array
  to: Uint8Array
  amount: bigint
}

/**
 * Some assets were destroyed.
 */
export interface AssetsEvent_Burned {
  __kind: 'Burned'
  assetId: bigint
  owner: Uint8Array
  balance: bigint
}

/**
 * The management team changed.
 */
export interface AssetsEvent_TeamChanged {
  __kind: 'TeamChanged'
  assetId: bigint
  issuer: Uint8Array
  admin: Uint8Array
  freezer: Uint8Array
}

/**
 * The owner changed.
 */
export interface AssetsEvent_OwnerChanged {
  __kind: 'OwnerChanged'
  assetId: bigint
  owner: Uint8Array
}

/**
 * Some account `who` was frozen.
 */
export interface AssetsEvent_Frozen {
  __kind: 'Frozen'
  assetId: bigint
  who: Uint8Array
}

/**
 * Some account `who` was thawed.
 */
export interface AssetsEvent_Thawed {
  __kind: 'Thawed'
  assetId: bigint
  who: Uint8Array
}

/**
 * Some asset `asset_id` was frozen.
 */
export interface AssetsEvent_AssetFrozen {
  __kind: 'AssetFrozen'
  assetId: bigint
}

/**
 * Some asset `asset_id` was thawed.
 */
export interface AssetsEvent_AssetThawed {
  __kind: 'AssetThawed'
  assetId: bigint
}

/**
 * Accounts were destroyed for given asset.
 */
export interface AssetsEvent_AccountsDestroyed {
  __kind: 'AccountsDestroyed'
  assetId: bigint
  accountsDestroyed: number
  accountsRemaining: number
}

/**
 * Approvals were destroyed for given asset.
 */
export interface AssetsEvent_ApprovalsDestroyed {
  __kind: 'ApprovalsDestroyed'
  assetId: bigint
  approvalsDestroyed: number
  approvalsRemaining: number
}

/**
 * An asset class is in the process of being destroyed.
 */
export interface AssetsEvent_DestructionStarted {
  __kind: 'DestructionStarted'
  assetId: bigint
}

/**
 * An asset class was destroyed.
 */
export interface AssetsEvent_Destroyed {
  __kind: 'Destroyed'
  assetId: bigint
}

/**
 * Some asset class was force-created.
 */
export interface AssetsEvent_ForceCreated {
  __kind: 'ForceCreated'
  assetId: bigint
  owner: Uint8Array
}

/**
 * New metadata has been set for an asset.
 */
export interface AssetsEvent_MetadataSet {
  __kind: 'MetadataSet'
  assetId: bigint
  name: Uint8Array
  symbol: Uint8Array
  decimals: number
  isFrozen: boolean
}

/**
 * Metadata has been cleared for an asset.
 */
export interface AssetsEvent_MetadataCleared {
  __kind: 'MetadataCleared'
  assetId: bigint
}

/**
 * (Additional) funds have been approved for transfer to a destination account.
 */
export interface AssetsEvent_ApprovedTransfer {
  __kind: 'ApprovedTransfer'
  assetId: bigint
  source: Uint8Array
  delegate: Uint8Array
  amount: bigint
}

/**
 * An approval for account `delegate` was cancelled by `owner`.
 */
export interface AssetsEvent_ApprovalCancelled {
  __kind: 'ApprovalCancelled'
  assetId: bigint
  owner: Uint8Array
  delegate: Uint8Array
}

/**
 * An `amount` was transferred in its entirety from `owner` to `destination` by
 * the approved `delegate`.
 */
export interface AssetsEvent_TransferredApproved {
  __kind: 'TransferredApproved'
  assetId: bigint
  owner: Uint8Array
  delegate: Uint8Array
  destination: Uint8Array
  amount: bigint
}

/**
 * An asset has had its attributes changed by the `Force` origin.
 */
export interface AssetsEvent_AssetStatusChanged {
  __kind: 'AssetStatusChanged'
  assetId: bigint
}

/**
 * The min_balance of an asset has been updated by the asset owner.
 */
export interface AssetsEvent_AssetMinBalanceChanged {
  __kind: 'AssetMinBalanceChanged'
  assetId: bigint
  newMinBalance: bigint
}

/**
 * Some account `who` was created with a deposit from `depositor`.
 */
export interface AssetsEvent_Touched {
  __kind: 'Touched'
  assetId: bigint
  who: Uint8Array
  depositor: Uint8Array
}

/**
 * Some account `who` was blocked.
 */
export interface AssetsEvent_Blocked {
  __kind: 'Blocked'
  assetId: bigint
  who: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type StakingEvent = StakingEvent_EraPaid | StakingEvent_Rewarded | StakingEvent_Slashed | StakingEvent_SlashReported | StakingEvent_OldSlashingReportDiscarded | StakingEvent_StakersElected | StakingEvent_Bonded | StakingEvent_Unbonded | StakingEvent_Withdrawn | StakingEvent_Kicked | StakingEvent_StakingElectionFailed | StakingEvent_Chilled | StakingEvent_PayoutStarted | StakingEvent_ValidatorPrefsSet | StakingEvent_ForceEra

/**
 * The era payout has been set; the first balance is the validator-payout; the second is
 * the remainder from the maximum amount of reward.
 */
export interface StakingEvent_EraPaid {
  __kind: 'EraPaid'
  eraIndex: number
  validatorPayout: bigint
  remainder: bigint
}

/**
 * The nominator has been rewarded by this amount.
 */
export interface StakingEvent_Rewarded {
  __kind: 'Rewarded'
  stash: Uint8Array
  amount: bigint
}

/**
 * A staker (validator or nominator) has been slashed by the given amount.
 */
export interface StakingEvent_Slashed {
  __kind: 'Slashed'
  staker: Uint8Array
  amount: bigint
}

/**
 * A slash for the given validator, for the given percentage of their stake, at the given
 * era as been reported.
 */
export interface StakingEvent_SlashReported {
  __kind: 'SlashReported'
  validator: Uint8Array
  fraction: number
  slashEra: number
}

/**
 * An old slashing report from a prior era was discarded because it could
 * not be processed.
 */
export interface StakingEvent_OldSlashingReportDiscarded {
  __kind: 'OldSlashingReportDiscarded'
  sessionIndex: number
}

/**
 * A new set of stakers was elected.
 */
export interface StakingEvent_StakersElected {
  __kind: 'StakersElected'
}

/**
 * An account has bonded this amount. \[stash, amount\]
 * 
 * NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
 * it will not be emitted for staking rewards when they are added to stake.
 */
export interface StakingEvent_Bonded {
  __kind: 'Bonded'
  stash: Uint8Array
  amount: bigint
}

/**
 * An account has unbonded this amount.
 */
export interface StakingEvent_Unbonded {
  __kind: 'Unbonded'
  stash: Uint8Array
  amount: bigint
}

/**
 * An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
 * from the unlocking queue.
 */
export interface StakingEvent_Withdrawn {
  __kind: 'Withdrawn'
  stash: Uint8Array
  amount: bigint
}

/**
 * A nominator has been kicked from a validator.
 */
export interface StakingEvent_Kicked {
  __kind: 'Kicked'
  nominator: Uint8Array
  stash: Uint8Array
}

/**
 * The election failed. No new era is planned.
 */
export interface StakingEvent_StakingElectionFailed {
  __kind: 'StakingElectionFailed'
}

/**
 * An account has stopped participating as either a validator or nominator.
 */
export interface StakingEvent_Chilled {
  __kind: 'Chilled'
  stash: Uint8Array
}

/**
 * The stakers' rewards are getting paid.
 */
export interface StakingEvent_PayoutStarted {
  __kind: 'PayoutStarted'
  eraIndex: number
  validatorStash: Uint8Array
}

/**
 * A validator has set their preferences.
 */
export interface StakingEvent_ValidatorPrefsSet {
  __kind: 'ValidatorPrefsSet'
  stash: Uint8Array
  prefs: ValidatorPrefs
}

/**
 * A new force era mode was set.
 */
export interface StakingEvent_ForceEra {
  __kind: 'ForceEra'
  mode: Forcing
}

/**
 * Events type.
 */
export type OffencesEvent = OffencesEvent_Offence

/**
 * There is an offence reported of the given `kind` happened at the `session_index` and
 * (kind-specific) time slot. This event is not deposited for duplicate slashes.
 * \[kind, timeslot\].
 */
export interface OffencesEvent_Offence {
  __kind: 'Offence'
  kind: Uint8Array
  timeslot: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type SessionEvent = SessionEvent_NewSession

/**
 * New session has happened. Note that the argument is the session index, not the
 * block number as the type might suggest.
 */
export interface SessionEvent_NewSession {
  __kind: 'NewSession'
  sessionIndex: number
}

/**
 * The `Event` enum of this pallet
 */
export type GrandpaEvent = GrandpaEvent_NewAuthorities | GrandpaEvent_Paused | GrandpaEvent_Resumed

/**
 * New authority set has been applied.
 */
export interface GrandpaEvent_NewAuthorities {
  __kind: 'NewAuthorities'
  authoritySet: [Uint8Array, bigint][]
}

/**
 * Current authority set has been paused.
 */
export interface GrandpaEvent_Paused {
  __kind: 'Paused'
}

/**
 * Current authority set has been resumed.
 */
export interface GrandpaEvent_Resumed {
  __kind: 'Resumed'
}

/**
 * The `Event` enum of this pallet
 */
export type ImOnlineEvent = ImOnlineEvent_HeartbeatReceived | ImOnlineEvent_AllGood | ImOnlineEvent_SomeOffline

/**
 * A new heartbeat was received from `AuthorityId`.
 */
export interface ImOnlineEvent_HeartbeatReceived {
  __kind: 'HeartbeatReceived'
  authorityId: Uint8Array
}

/**
 * At the end of the session, no offence was committed.
 */
export interface ImOnlineEvent_AllGood {
  __kind: 'AllGood'
}

/**
 * At the end of the session, at least one validator was found to be offline.
 */
export interface ImOnlineEvent_SomeOffline {
  __kind: 'SomeOffline'
  offline: [Uint8Array, Exposure][]
}

/**
 * The `Event` enum of this pallet
 */
export type ElectionProviderMultiPhaseEvent = ElectionProviderMultiPhaseEvent_SolutionStored | ElectionProviderMultiPhaseEvent_ElectionFinalized | ElectionProviderMultiPhaseEvent_ElectionFailed | ElectionProviderMultiPhaseEvent_Rewarded | ElectionProviderMultiPhaseEvent_Slashed | ElectionProviderMultiPhaseEvent_PhaseTransitioned

/**
 * A solution was stored with the given compute.
 * 
 * The `origin` indicates the origin of the solution. If `origin` is `Some(AccountId)`,
 * the stored solution was submited in the signed phase by a miner with the `AccountId`.
 * Otherwise, the solution was stored either during the unsigned phase or by
 * `T::ForceOrigin`. The `bool` is `true` when a previous solution was ejected to make
 * room for this one.
 */
export interface ElectionProviderMultiPhaseEvent_SolutionStored {
  __kind: 'SolutionStored'
  compute: ElectionCompute
  origin: (Uint8Array | undefined)
  prevEjected: boolean
}

/**
 * The election has been finalized, with the given computation and score.
 */
export interface ElectionProviderMultiPhaseEvent_ElectionFinalized {
  __kind: 'ElectionFinalized'
  compute: ElectionCompute
  score: ElectionScore
}

/**
 * An election failed.
 * 
 * Not much can be said about which computes failed in the process.
 */
export interface ElectionProviderMultiPhaseEvent_ElectionFailed {
  __kind: 'ElectionFailed'
}

/**
 * An account has been rewarded for their signed submission being finalized.
 */
export interface ElectionProviderMultiPhaseEvent_Rewarded {
  __kind: 'Rewarded'
  account: Uint8Array
  value: bigint
}

/**
 * An account has been slashed for submitting an invalid signed submission.
 */
export interface ElectionProviderMultiPhaseEvent_Slashed {
  __kind: 'Slashed'
  account: Uint8Array
  value: bigint
}

/**
 * There was a phase transition in a given round.
 */
export interface ElectionProviderMultiPhaseEvent_PhaseTransitioned {
  __kind: 'PhaseTransitioned'
  from: Phase
  to: Phase
  round: number
}

/**
 * The `Event` enum of this pallet
 */
export type VoterListEvent = VoterListEvent_Rebagged | VoterListEvent_ScoreUpdated

/**
 * Moved an account from one bag to another.
 */
export interface VoterListEvent_Rebagged {
  __kind: 'Rebagged'
  who: Uint8Array
  from: bigint
  to: bigint
}

/**
 * Updated the score of some account to the given amount.
 */
export interface VoterListEvent_ScoreUpdated {
  __kind: 'ScoreUpdated'
  who: Uint8Array
  newScore: bigint
}

/**
 * The `Event` enum of this pallet
 */
export type FastUnstakeEvent = FastUnstakeEvent_Unstaked | FastUnstakeEvent_Slashed | FastUnstakeEvent_BatchChecked | FastUnstakeEvent_BatchFinished | FastUnstakeEvent_InternalError

/**
 * A staker was unstaked.
 */
export interface FastUnstakeEvent_Unstaked {
  __kind: 'Unstaked'
  stash: Uint8Array
  result: Result<null, DispatchError>
}

/**
 * A staker was slashed for requesting fast-unstake whilst being exposed.
 */
export interface FastUnstakeEvent_Slashed {
  __kind: 'Slashed'
  stash: Uint8Array
  amount: bigint
}

/**
 * A batch was partially checked for the given eras, but the process did not finish.
 */
export interface FastUnstakeEvent_BatchChecked {
  __kind: 'BatchChecked'
  eras: number[]
}

/**
 * A batch of a given size was terminated.
 * 
 * This is always follows by a number of `Unstaked` or `Slashed` events, marking the end
 * of the batch. A new batch will be created upon next block.
 */
export interface FastUnstakeEvent_BatchFinished {
  __kind: 'BatchFinished'
  size: number
}

/**
 * An internal error happened. Operations will be paused now.
 */
export interface FastUnstakeEvent_InternalError {
  __kind: 'InternalError'
}

/**
 * The `Event` enum of this pallet
 */
export type TreasuryEvent = TreasuryEvent_Proposed | TreasuryEvent_Spending | TreasuryEvent_Awarded | TreasuryEvent_Rejected | TreasuryEvent_Burnt | TreasuryEvent_Rollover | TreasuryEvent_Deposit | TreasuryEvent_SpendApproved | TreasuryEvent_UpdatedInactive

/**
 * New proposal.
 */
export interface TreasuryEvent_Proposed {
  __kind: 'Proposed'
  proposalIndex: number
}

/**
 * We have ended a spend period and will now allocate funds.
 */
export interface TreasuryEvent_Spending {
  __kind: 'Spending'
  budgetRemaining: bigint
}

/**
 * Some funds have been allocated.
 */
export interface TreasuryEvent_Awarded {
  __kind: 'Awarded'
  proposalIndex: number
  award: bigint
  account: Uint8Array
}

/**
 * A proposal was rejected; funds were slashed.
 */
export interface TreasuryEvent_Rejected {
  __kind: 'Rejected'
  proposalIndex: number
  slashed: bigint
}

/**
 * Some of our funds have been burnt.
 */
export interface TreasuryEvent_Burnt {
  __kind: 'Burnt'
  burntFunds: bigint
}

/**
 * Spending has finished; this is the amount that rolls over until next spend.
 */
export interface TreasuryEvent_Rollover {
  __kind: 'Rollover'
  rolloverBalance: bigint
}

/**
 * Some funds have been deposited.
 */
export interface TreasuryEvent_Deposit {
  __kind: 'Deposit'
  value: bigint
}

/**
 * A new spend proposal has been approved.
 */
export interface TreasuryEvent_SpendApproved {
  __kind: 'SpendApproved'
  proposalIndex: number
  amount: bigint
  beneficiary: Uint8Array
}

/**
 * The inactive funds of the pallet have been updated.
 */
export interface TreasuryEvent_UpdatedInactive {
  __kind: 'UpdatedInactive'
  reactivated: bigint
  deactivated: bigint
}

/**
 * The `Event` enum of this pallet
 */
export type ConvictionVotingEvent = ConvictionVotingEvent_Delegated | ConvictionVotingEvent_Undelegated

/**
 * An account has delegated their vote to another account. \[who, target\]
 */
export interface ConvictionVotingEvent_Delegated {
  __kind: 'Delegated'
  value: [Uint8Array, Uint8Array]
}

/**
 * An \[account\] has cancelled a previous delegation operation.
 */
export interface ConvictionVotingEvent_Undelegated {
  __kind: 'Undelegated'
  value: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type ReferendaEvent = ReferendaEvent_Submitted | ReferendaEvent_DecisionDepositPlaced | ReferendaEvent_DecisionDepositRefunded | ReferendaEvent_DepositSlashed | ReferendaEvent_DecisionStarted | ReferendaEvent_ConfirmStarted | ReferendaEvent_ConfirmAborted | ReferendaEvent_Confirmed | ReferendaEvent_Approved | ReferendaEvent_Rejected | ReferendaEvent_TimedOut | ReferendaEvent_Cancelled | ReferendaEvent_Killed | ReferendaEvent_SubmissionDepositRefunded | ReferendaEvent_MetadataSet | ReferendaEvent_MetadataCleared

/**
 * A referendum has been submitted.
 */
export interface ReferendaEvent_Submitted {
  __kind: 'Submitted'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The track (and by extension proposal dispatch origin) of this referendum.
   */
  track: number
  /**
   * The proposal for the referendum.
   */
  proposal: Bounded
}

/**
 * The decision deposit has been placed.
 */
export interface ReferendaEvent_DecisionDepositPlaced {
  __kind: 'DecisionDepositPlaced'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The account who placed the deposit.
   */
  who: Uint8Array
  /**
   * The amount placed by the account.
   */
  amount: bigint
}

/**
 * The decision deposit has been refunded.
 */
export interface ReferendaEvent_DecisionDepositRefunded {
  __kind: 'DecisionDepositRefunded'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The account who placed the deposit.
   */
  who: Uint8Array
  /**
   * The amount placed by the account.
   */
  amount: bigint
}

/**
 * A deposit has been slashaed.
 */
export interface ReferendaEvent_DepositSlashed {
  __kind: 'DepositSlashed'
  /**
   * The account who placed the deposit.
   */
  who: Uint8Array
  /**
   * The amount placed by the account.
   */
  amount: bigint
}

/**
 * A referendum has moved into the deciding phase.
 */
export interface ReferendaEvent_DecisionStarted {
  __kind: 'DecisionStarted'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The track (and by extension proposal dispatch origin) of this referendum.
   */
  track: number
  /**
   * The proposal for the referendum.
   */
  proposal: Bounded
  /**
   * The current tally of votes in this referendum.
   */
  tally: Tally
}

export interface ReferendaEvent_ConfirmStarted {
  __kind: 'ConfirmStarted'
  /**
   * Index of the referendum.
   */
  index: number
}

export interface ReferendaEvent_ConfirmAborted {
  __kind: 'ConfirmAborted'
  /**
   * Index of the referendum.
   */
  index: number
}

/**
 * A referendum has ended its confirmation phase and is ready for approval.
 */
export interface ReferendaEvent_Confirmed {
  __kind: 'Confirmed'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The final tally of votes in this referendum.
   */
  tally: Tally
}

/**
 * A referendum has been approved and its proposal has been scheduled.
 */
export interface ReferendaEvent_Approved {
  __kind: 'Approved'
  /**
   * Index of the referendum.
   */
  index: number
}

/**
 * A proposal has been rejected by referendum.
 */
export interface ReferendaEvent_Rejected {
  __kind: 'Rejected'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The final tally of votes in this referendum.
   */
  tally: Tally
}

/**
 * A referendum has been timed out without being decided.
 */
export interface ReferendaEvent_TimedOut {
  __kind: 'TimedOut'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The final tally of votes in this referendum.
   */
  tally: Tally
}

/**
 * A referendum has been cancelled.
 */
export interface ReferendaEvent_Cancelled {
  __kind: 'Cancelled'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The final tally of votes in this referendum.
   */
  tally: Tally
}

/**
 * A referendum has been killed.
 */
export interface ReferendaEvent_Killed {
  __kind: 'Killed'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The final tally of votes in this referendum.
   */
  tally: Tally
}

/**
 * The submission deposit has been refunded.
 */
export interface ReferendaEvent_SubmissionDepositRefunded {
  __kind: 'SubmissionDepositRefunded'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * The account who placed the deposit.
   */
  who: Uint8Array
  /**
   * The amount placed by the account.
   */
  amount: bigint
}

/**
 * Metadata for a referendum has been set.
 */
export interface ReferendaEvent_MetadataSet {
  __kind: 'MetadataSet'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * Preimage hash.
   */
  hash: Uint8Array
}

/**
 * Metadata for a referendum has been cleared.
 */
export interface ReferendaEvent_MetadataCleared {
  __kind: 'MetadataCleared'
  /**
   * Index of the referendum.
   */
  index: number
  /**
   * Preimage hash.
   */
  hash: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type WhitelistEvent = WhitelistEvent_CallWhitelisted | WhitelistEvent_WhitelistedCallRemoved | WhitelistEvent_WhitelistedCallDispatched

export interface WhitelistEvent_CallWhitelisted {
  __kind: 'CallWhitelisted'
  callHash: Uint8Array
}

export interface WhitelistEvent_WhitelistedCallRemoved {
  __kind: 'WhitelistedCallRemoved'
  callHash: Uint8Array
}

export interface WhitelistEvent_WhitelistedCallDispatched {
  __kind: 'WhitelistedCallDispatched'
  callHash: Uint8Array
  result: Result<PostDispatchInfo, DispatchErrorWithPostInfo>
}

/**
 * The `Event` enum of this pallet
 */
export type BountiesEvent = BountiesEvent_BountyProposed | BountiesEvent_BountyRejected | BountiesEvent_BountyBecameActive | BountiesEvent_BountyAwarded | BountiesEvent_BountyClaimed | BountiesEvent_BountyCanceled | BountiesEvent_BountyExtended

/**
 * New bounty proposal.
 */
export interface BountiesEvent_BountyProposed {
  __kind: 'BountyProposed'
  index: number
}

/**
 * A bounty proposal was rejected; funds were slashed.
 */
export interface BountiesEvent_BountyRejected {
  __kind: 'BountyRejected'
  index: number
  bond: bigint
}

/**
 * A bounty proposal is funded and became active.
 */
export interface BountiesEvent_BountyBecameActive {
  __kind: 'BountyBecameActive'
  index: number
}

/**
 * A bounty is awarded to a beneficiary.
 */
export interface BountiesEvent_BountyAwarded {
  __kind: 'BountyAwarded'
  index: number
  beneficiary: Uint8Array
}

/**
 * A bounty is claimed by beneficiary.
 */
export interface BountiesEvent_BountyClaimed {
  __kind: 'BountyClaimed'
  index: number
  payout: bigint
  beneficiary: Uint8Array
}

/**
 * A bounty is cancelled.
 */
export interface BountiesEvent_BountyCanceled {
  __kind: 'BountyCanceled'
  index: number
}

/**
 * A bounty expiry is extended.
 */
export interface BountiesEvent_BountyExtended {
  __kind: 'BountyExtended'
  index: number
}

/**
 * The `Event` enum of this pallet
 */
export type ChildBountiesEvent = ChildBountiesEvent_Added | ChildBountiesEvent_Awarded | ChildBountiesEvent_Claimed | ChildBountiesEvent_Canceled

/**
 * A child-bounty is added.
 */
export interface ChildBountiesEvent_Added {
  __kind: 'Added'
  index: number
  childIndex: number
}

/**
 * A child-bounty is awarded to a beneficiary.
 */
export interface ChildBountiesEvent_Awarded {
  __kind: 'Awarded'
  index: number
  childIndex: number
  beneficiary: Uint8Array
}

/**
 * A child-bounty is claimed by beneficiary.
 */
export interface ChildBountiesEvent_Claimed {
  __kind: 'Claimed'
  index: number
  childIndex: number
  payout: bigint
  beneficiary: Uint8Array
}

/**
 * A child-bounty is cancelled.
 */
export interface ChildBountiesEvent_Canceled {
  __kind: 'Canceled'
  index: number
  childIndex: number
}

/**
 * The `Event` enum of this pallet
 */
export type UtilityEvent = UtilityEvent_BatchInterrupted | UtilityEvent_BatchCompleted | UtilityEvent_BatchCompletedWithErrors | UtilityEvent_ItemCompleted | UtilityEvent_ItemFailed | UtilityEvent_DispatchedAs

/**
 * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
 * well as the error.
 */
export interface UtilityEvent_BatchInterrupted {
  __kind: 'BatchInterrupted'
  index: number
  error: DispatchError
}

/**
 * Batch of dispatches completed fully with no error.
 */
export interface UtilityEvent_BatchCompleted {
  __kind: 'BatchCompleted'
}

/**
 * Batch of dispatches completed but has errors.
 */
export interface UtilityEvent_BatchCompletedWithErrors {
  __kind: 'BatchCompletedWithErrors'
}

/**
 * A single item within a Batch of dispatches has completed with no error.
 */
export interface UtilityEvent_ItemCompleted {
  __kind: 'ItemCompleted'
}

/**
 * A single item within a Batch of dispatches has completed with error.
 */
export interface UtilityEvent_ItemFailed {
  __kind: 'ItemFailed'
  error: DispatchError
}

/**
 * A call was dispatched.
 */
export interface UtilityEvent_DispatchedAs {
  __kind: 'DispatchedAs'
  result: Result<null, DispatchError>
}

/**
 * The `Event` enum of this pallet
 */
export type MultisigEvent = MultisigEvent_NewMultisig | MultisigEvent_MultisigApproval | MultisigEvent_MultisigExecuted | MultisigEvent_MultisigCancelled

/**
 * A new multisig operation has begun.
 */
export interface MultisigEvent_NewMultisig {
  __kind: 'NewMultisig'
  approving: Uint8Array
  multisig: Uint8Array
  callHash: Uint8Array
}

/**
 * A multisig operation has been approved by someone.
 */
export interface MultisigEvent_MultisigApproval {
  __kind: 'MultisigApproval'
  approving: Uint8Array
  timepoint: Timepoint
  multisig: Uint8Array
  callHash: Uint8Array
}

/**
 * A multisig operation has been executed.
 */
export interface MultisigEvent_MultisigExecuted {
  __kind: 'MultisigExecuted'
  approving: Uint8Array
  timepoint: Timepoint
  multisig: Uint8Array
  callHash: Uint8Array
  result: Result<null, DispatchError>
}

/**
 * A multisig operation has been cancelled.
 */
export interface MultisigEvent_MultisigCancelled {
  __kind: 'MultisigCancelled'
  cancelling: Uint8Array
  timepoint: Timepoint
  multisig: Uint8Array
  callHash: Uint8Array
}

/**
 * Events type.
 */
export type RecoveryEvent = RecoveryEvent_RecoveryCreated | RecoveryEvent_RecoveryInitiated | RecoveryEvent_RecoveryVouched | RecoveryEvent_RecoveryClosed | RecoveryEvent_AccountRecovered | RecoveryEvent_RecoveryRemoved

/**
 * A recovery process has been set up for an account.
 */
export interface RecoveryEvent_RecoveryCreated {
  __kind: 'RecoveryCreated'
  account: Uint8Array
}

/**
 * A recovery process has been initiated for lost account by rescuer account.
 */
export interface RecoveryEvent_RecoveryInitiated {
  __kind: 'RecoveryInitiated'
  lostAccount: Uint8Array
  rescuerAccount: Uint8Array
}

/**
 * A recovery process for lost account by rescuer account has been vouched for by sender.
 */
export interface RecoveryEvent_RecoveryVouched {
  __kind: 'RecoveryVouched'
  lostAccount: Uint8Array
  rescuerAccount: Uint8Array
  sender: Uint8Array
}

/**
 * A recovery process for lost account by rescuer account has been closed.
 */
export interface RecoveryEvent_RecoveryClosed {
  __kind: 'RecoveryClosed'
  lostAccount: Uint8Array
  rescuerAccount: Uint8Array
}

/**
 * Lost account has been successfully recovered by rescuer account.
 */
export interface RecoveryEvent_AccountRecovered {
  __kind: 'AccountRecovered'
  lostAccount: Uint8Array
  rescuerAccount: Uint8Array
}

/**
 * A recovery process has been removed for an account.
 */
export interface RecoveryEvent_RecoveryRemoved {
  __kind: 'RecoveryRemoved'
  lostAccount: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type ProxyEvent = ProxyEvent_ProxyExecuted | ProxyEvent_PureCreated | ProxyEvent_Announced | ProxyEvent_ProxyAdded | ProxyEvent_ProxyRemoved

/**
 * A proxy was executed correctly, with the given.
 */
export interface ProxyEvent_ProxyExecuted {
  __kind: 'ProxyExecuted'
  result: Result<null, DispatchError>
}

/**
 * A pure account has been created by new proxy with given
 * disambiguation index and proxy type.
 */
export interface ProxyEvent_PureCreated {
  __kind: 'PureCreated'
  pure: Uint8Array
  who: Uint8Array
  proxyType: ProxyType
  disambiguationIndex: number
}

/**
 * An announcement was placed to make a call in the future.
 */
export interface ProxyEvent_Announced {
  __kind: 'Announced'
  real: Uint8Array
  proxy: Uint8Array
  callHash: Uint8Array
}

/**
 * A proxy was added.
 */
export interface ProxyEvent_ProxyAdded {
  __kind: 'ProxyAdded'
  delegator: Uint8Array
  delegatee: Uint8Array
  proxyType: ProxyType
  delay: number
}

/**
 * A proxy was removed.
 */
export interface ProxyEvent_ProxyRemoved {
  __kind: 'ProxyRemoved'
  delegator: Uint8Array
  delegatee: Uint8Array
  proxyType: ProxyType
  delay: number
}

/**
 * The `Event` enum of this pallet
 */
export type IndicesEvent = IndicesEvent_IndexAssigned | IndicesEvent_IndexFreed | IndicesEvent_IndexFrozen

/**
 * A account index was assigned.
 */
export interface IndicesEvent_IndexAssigned {
  __kind: 'IndexAssigned'
  who: Uint8Array
  index: number
}

/**
 * A account index has been freed up (unassigned).
 */
export interface IndicesEvent_IndexFreed {
  __kind: 'IndexFreed'
  index: number
}

/**
 * A account index has been frozen to its current account ID.
 */
export interface IndicesEvent_IndexFrozen {
  __kind: 'IndexFrozen'
  index: number
  who: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type IdentityEvent = IdentityEvent_IdentitySet | IdentityEvent_IdentityCleared | IdentityEvent_IdentityKilled | IdentityEvent_JudgementRequested | IdentityEvent_JudgementUnrequested | IdentityEvent_JudgementGiven | IdentityEvent_RegistrarAdded | IdentityEvent_SubIdentityAdded | IdentityEvent_SubIdentityRemoved | IdentityEvent_SubIdentityRevoked

/**
 * A name was set or reset (which will remove all judgements).
 */
export interface IdentityEvent_IdentitySet {
  __kind: 'IdentitySet'
  who: Uint8Array
}

/**
 * A name was cleared, and the given balance returned.
 */
export interface IdentityEvent_IdentityCleared {
  __kind: 'IdentityCleared'
  who: Uint8Array
  deposit: bigint
}

/**
 * A name was removed and the given balance slashed.
 */
export interface IdentityEvent_IdentityKilled {
  __kind: 'IdentityKilled'
  who: Uint8Array
  deposit: bigint
}

/**
 * A judgement was asked from a registrar.
 */
export interface IdentityEvent_JudgementRequested {
  __kind: 'JudgementRequested'
  who: Uint8Array
  registrarIndex: number
}

/**
 * A judgement request was retracted.
 */
export interface IdentityEvent_JudgementUnrequested {
  __kind: 'JudgementUnrequested'
  who: Uint8Array
  registrarIndex: number
}

/**
 * A judgement was given by a registrar.
 */
export interface IdentityEvent_JudgementGiven {
  __kind: 'JudgementGiven'
  target: Uint8Array
  registrarIndex: number
}

/**
 * A registrar was added.
 */
export interface IdentityEvent_RegistrarAdded {
  __kind: 'RegistrarAdded'
  registrarIndex: number
}

/**
 * A sub-identity was added to an identity and the deposit paid.
 */
export interface IdentityEvent_SubIdentityAdded {
  __kind: 'SubIdentityAdded'
  sub: Uint8Array
  main: Uint8Array
  deposit: bigint
}

/**
 * A sub-identity was removed from an identity and the deposit freed.
 */
export interface IdentityEvent_SubIdentityRemoved {
  __kind: 'SubIdentityRemoved'
  sub: Uint8Array
  main: Uint8Array
  deposit: bigint
}

/**
 * A sub-identity was cleared, and the given deposit repatriated from the
 * main identity account to the sub-identity account.
 */
export interface IdentityEvent_SubIdentityRevoked {
  __kind: 'SubIdentityRevoked'
  sub: Uint8Array
  main: Uint8Array
  deposit: bigint
}

/**
 * The `Event` enum of this pallet
 */
export type VestingEvent = VestingEvent_VestingUpdated | VestingEvent_VestingCompleted

/**
 * The amount vested has been updated. This could indicate a change in funds available.
 * The balance given is the amount which is left unvested (and thus locked).
 */
export interface VestingEvent_VestingUpdated {
  __kind: 'VestingUpdated'
  account: Uint8Array
  unvested: bigint
}

/**
 * An \[account\] has become fully vested.
 */
export interface VestingEvent_VestingCompleted {
  __kind: 'VestingCompleted'
  account: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type EVMEvent = EVMEvent_Log | EVMEvent_Created | EVMEvent_CreatedFailed | EVMEvent_Executed | EVMEvent_ExecutedFailed

/**
 * Ethereum events from contracts.
 */
export interface EVMEvent_Log {
  __kind: 'Log'
  log: Log
}

/**
 * A contract has been created at given address.
 */
export interface EVMEvent_Created {
  __kind: 'Created'
  address: Uint8Array
}

/**
 * A contract was attempted to be created, but the execution failed.
 */
export interface EVMEvent_CreatedFailed {
  __kind: 'CreatedFailed'
  address: Uint8Array
}

/**
 * A contract has been executed successfully with states applied.
 */
export interface EVMEvent_Executed {
  __kind: 'Executed'
  address: Uint8Array
}

/**
 * A contract has been executed with errors. States are reverted with only gas fees applied.
 */
export interface EVMEvent_ExecutedFailed {
  __kind: 'ExecutedFailed'
  address: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type EthereumEvent = EthereumEvent_Executed

/**
 * An ethereum transaction was successfully executed.
 */
export interface EthereumEvent_Executed {
  __kind: 'Executed'
  from: Uint8Array
  to: Uint8Array
  transactionHash: Uint8Array
  exitReason: ExitReason
  extraData: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type BaseFeeEvent = BaseFeeEvent_NewBaseFeePerGas | BaseFeeEvent_BaseFeeOverflow | BaseFeeEvent_NewElasticity

export interface BaseFeeEvent_NewBaseFeePerGas {
  __kind: 'NewBaseFeePerGas'
  fee: bigint[]
}

export interface BaseFeeEvent_BaseFeeOverflow {
  __kind: 'BaseFeeOverflow'
}

export interface BaseFeeEvent_NewElasticity {
  __kind: 'NewElasticity'
  elasticity: number
}

/**
 * The `Event` enum of this pallet
 */
export type EthCallEvent = EthCallEvent_Executed

/**
 * A call just executed. \[result\]
 */
export interface EthCallEvent_Executed {
  __kind: 'Executed'
  value: [Uint8Array, Result<null, DispatchError>]
}

/**
 * The `Event` enum of this pallet
 */
export type ContractsEvent = ContractsEvent_Instantiated | ContractsEvent_Terminated | ContractsEvent_CodeStored | ContractsEvent_ContractEmitted | ContractsEvent_CodeRemoved | ContractsEvent_ContractCodeUpdated | ContractsEvent_Called | ContractsEvent_DelegateCalled

/**
 * Contract deployed by address at the specified address.
 */
export interface ContractsEvent_Instantiated {
  __kind: 'Instantiated'
  deployer: Uint8Array
  contract: Uint8Array
}

/**
 * Contract has been removed.
 * 
 * # Note
 * 
 * The only way for a contract to be removed and emitting this event is by calling
 * `seal_terminate`.
 */
export interface ContractsEvent_Terminated {
  __kind: 'Terminated'
  /**
   * The contract that was terminated.
   */
  contract: Uint8Array
  /**
   * The account that received the contracts remaining balance
   */
  beneficiary: Uint8Array
}

/**
 * Code with the specified hash has been stored.
 */
export interface ContractsEvent_CodeStored {
  __kind: 'CodeStored'
  codeHash: Uint8Array
}

/**
 * A custom event emitted by the contract.
 */
export interface ContractsEvent_ContractEmitted {
  __kind: 'ContractEmitted'
  /**
   * The contract that emitted the event.
   */
  contract: Uint8Array
  /**
   * Data supplied by the contract. Metadata generated during contract compilation
   * is needed to decode it.
   */
  data: Uint8Array
}

/**
 * A code with the specified hash was removed.
 */
export interface ContractsEvent_CodeRemoved {
  __kind: 'CodeRemoved'
  codeHash: Uint8Array
}

/**
 * A contract's code was updated.
 */
export interface ContractsEvent_ContractCodeUpdated {
  __kind: 'ContractCodeUpdated'
  /**
   * The contract that has been updated.
   */
  contract: Uint8Array
  /**
   * New code hash that was set for the contract.
   */
  newCodeHash: Uint8Array
  /**
   * Previous code hash of the contract.
   */
  oldCodeHash: Uint8Array
}

/**
 * A contract was called either by a plain account or another contract.
 * 
 * # Note
 * 
 * Please keep in mind that like all events this is only emitted for successful
 * calls. This is because on failure all storage changes including events are
 * rolled back.
 */
export interface ContractsEvent_Called {
  __kind: 'Called'
  /**
   * The caller of the `contract`.
   */
  caller: Type_317
  /**
   * The contract that was called.
   */
  contract: Uint8Array
}

/**
 * A contract delegate called a code hash.
 * 
 * # Note
 * 
 * Please keep in mind that like all events this is only emitted for successful
 * calls. This is because on failure all storage changes including events are
 * rolled back.
 */
export interface ContractsEvent_DelegateCalled {
  __kind: 'DelegateCalled'
  /**
   * The contract that performed the delegate call and hence in whose context
   * the `code_hash` is executed.
   */
  contract: Uint8Array
  /**
   * The code hash that was delegate called.
   */
  codeHash: Uint8Array
}

/**
 * The `Event` enum of this pallet
 */
export type SudoEvent = SudoEvent_Sudid | SudoEvent_KeyChanged | SudoEvent_SudoAsDone

/**
 * A sudo just took place. \[result\]
 */
export interface SudoEvent_Sudid {
  __kind: 'Sudid'
  sudoResult: Result<null, DispatchError>
}

/**
 * The \[sudoer\] just switched identity; the old key is supplied if one existed.
 */
export interface SudoEvent_KeyChanged {
  __kind: 'KeyChanged'
  oldSudoer: (Uint8Array | undefined)
}

/**
 * A sudo just took place. \[result\]
 */
export interface SudoEvent_SudoAsDone {
  __kind: 'SudoAsDone'
  sudoResult: Result<null, DispatchError>
}

export interface DispatchInfo {
  weight: Weight
  class: DispatchClass
  paysFee: Pays
}

export type DispatchError = DispatchError_Other | DispatchError_CannotLookup | DispatchError_BadOrigin | DispatchError_Module | DispatchError_ConsumerRemaining | DispatchError_NoProviders | DispatchError_TooManyConsumers | DispatchError_Token | DispatchError_Arithmetic | DispatchError_Transactional | DispatchError_Exhausted | DispatchError_Corruption | DispatchError_Unavailable | DispatchError_RootNotAllowed

export interface DispatchError_Other {
  __kind: 'Other'
}

export interface DispatchError_CannotLookup {
  __kind: 'CannotLookup'
}

export interface DispatchError_BadOrigin {
  __kind: 'BadOrigin'
}

export interface DispatchError_Module {
  __kind: 'Module'
  value: ModuleError
}

export interface DispatchError_ConsumerRemaining {
  __kind: 'ConsumerRemaining'
}

export interface DispatchError_NoProviders {
  __kind: 'NoProviders'
}

export interface DispatchError_TooManyConsumers {
  __kind: 'TooManyConsumers'
}

export interface DispatchError_Token {
  __kind: 'Token'
  value: TokenError
}

export interface DispatchError_Arithmetic {
  __kind: 'Arithmetic'
  value: ArithmeticError
}

export interface DispatchError_Transactional {
  __kind: 'Transactional'
  value: TransactionalError
}

export interface DispatchError_Exhausted {
  __kind: 'Exhausted'
}

export interface DispatchError_Corruption {
  __kind: 'Corruption'
}

export interface DispatchError_Unavailable {
  __kind: 'Unavailable'
}

export interface DispatchError_RootNotAllowed {
  __kind: 'RootNotAllowed'
}

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
  __kind: 'Free'
}

export interface BalanceStatus_Reserved {
  __kind: 'Reserved'
}

export interface PostDispatchInfo {
  actualWeight: (Weight | undefined)
  paysFee: Pays
}

export interface DispatchErrorWithPostInfo {
  postInfo: PostDispatchInfo
  error: DispatchError
}

export type ExitReason = ExitReason_Succeed | ExitReason_Error | ExitReason_Revert | ExitReason_Fatal

export interface ExitReason_Succeed {
  __kind: 'Succeed'
  value: ExitSucceed
}

export interface ExitReason_Error {
  __kind: 'Error'
  value: ExitError
}

export interface ExitReason_Revert {
  __kind: 'Revert'
  value: ExitRevert
}

export interface ExitReason_Fatal {
  __kind: 'Fatal'
  value: ExitFatal
}

export type Type_317 = Type_317_Root | Type_317_Signed

export interface Type_317_Root {
  __kind: 'Root'
}

export interface Type_317_Signed {
  __kind: 'Signed'
  value: Uint8Array
}

export type DispatchClass = DispatchClass_Normal | DispatchClass_Operational | DispatchClass_Mandatory

export interface DispatchClass_Normal {
  __kind: 'Normal'
}

export interface DispatchClass_Operational {
  __kind: 'Operational'
}

export interface DispatchClass_Mandatory {
  __kind: 'Mandatory'
}

export type Pays = Pays_Yes | Pays_No

export interface Pays_Yes {
  __kind: 'Yes'
}

export interface Pays_No {
  __kind: 'No'
}

export interface ModuleError {
  index: number
  error: Uint8Array
}

export type TokenError = TokenError_FundsUnavailable | TokenError_OnlyProvider | TokenError_BelowMinimum | TokenError_CannotCreate | TokenError_UnknownAsset | TokenError_Frozen | TokenError_Unsupported | TokenError_CannotCreateHold | TokenError_NotExpendable | TokenError_Blocked

export interface TokenError_FundsUnavailable {
  __kind: 'FundsUnavailable'
}

export interface TokenError_OnlyProvider {
  __kind: 'OnlyProvider'
}

export interface TokenError_BelowMinimum {
  __kind: 'BelowMinimum'
}

export interface TokenError_CannotCreate {
  __kind: 'CannotCreate'
}

export interface TokenError_UnknownAsset {
  __kind: 'UnknownAsset'
}

export interface TokenError_Frozen {
  __kind: 'Frozen'
}

export interface TokenError_Unsupported {
  __kind: 'Unsupported'
}

export interface TokenError_CannotCreateHold {
  __kind: 'CannotCreateHold'
}

export interface TokenError_NotExpendable {
  __kind: 'NotExpendable'
}

export interface TokenError_Blocked {
  __kind: 'Blocked'
}

export type ArithmeticError = ArithmeticError_Underflow | ArithmeticError_Overflow | ArithmeticError_DivisionByZero

export interface ArithmeticError_Underflow {
  __kind: 'Underflow'
}

export interface ArithmeticError_Overflow {
  __kind: 'Overflow'
}

export interface ArithmeticError_DivisionByZero {
  __kind: 'DivisionByZero'
}

export type TransactionalError = TransactionalError_LimitReached | TransactionalError_NoLayer

export interface TransactionalError_LimitReached {
  __kind: 'LimitReached'
}

export interface TransactionalError_NoLayer {
  __kind: 'NoLayer'
}

export type ExitSucceed = ExitSucceed_Stopped | ExitSucceed_Returned | ExitSucceed_Suicided

export interface ExitSucceed_Stopped {
  __kind: 'Stopped'
}

export interface ExitSucceed_Returned {
  __kind: 'Returned'
}

export interface ExitSucceed_Suicided {
  __kind: 'Suicided'
}

export type ExitError = ExitError_StackUnderflow | ExitError_StackOverflow | ExitError_InvalidJump | ExitError_InvalidRange | ExitError_DesignatedInvalid | ExitError_CallTooDeep | ExitError_CreateCollision | ExitError_CreateContractLimit | ExitError_InvalidCode | ExitError_OutOfOffset | ExitError_OutOfGas | ExitError_OutOfFund | ExitError_PCUnderflow | ExitError_CreateEmpty | ExitError_Other | ExitError_MaxNonce

export interface ExitError_StackUnderflow {
  __kind: 'StackUnderflow'
}

export interface ExitError_StackOverflow {
  __kind: 'StackOverflow'
}

export interface ExitError_InvalidJump {
  __kind: 'InvalidJump'
}

export interface ExitError_InvalidRange {
  __kind: 'InvalidRange'
}

export interface ExitError_DesignatedInvalid {
  __kind: 'DesignatedInvalid'
}

export interface ExitError_CallTooDeep {
  __kind: 'CallTooDeep'
}

export interface ExitError_CreateCollision {
  __kind: 'CreateCollision'
}

export interface ExitError_CreateContractLimit {
  __kind: 'CreateContractLimit'
}

export interface ExitError_InvalidCode {
  __kind: 'InvalidCode'
  value: number
}

export interface ExitError_OutOfOffset {
  __kind: 'OutOfOffset'
}

export interface ExitError_OutOfGas {
  __kind: 'OutOfGas'
}

export interface ExitError_OutOfFund {
  __kind: 'OutOfFund'
}

export interface ExitError_PCUnderflow {
  __kind: 'PCUnderflow'
}

export interface ExitError_CreateEmpty {
  __kind: 'CreateEmpty'
}

export interface ExitError_Other {
  __kind: 'Other'
  value: string
}

export interface ExitError_MaxNonce {
  __kind: 'MaxNonce'
}

export type ExitRevert = ExitRevert_Reverted

export interface ExitRevert_Reverted {
  __kind: 'Reverted'
}

export type ExitFatal = ExitFatal_NotSupported | ExitFatal_UnhandledInterrupt | ExitFatal_CallErrorAsFatal | ExitFatal_Other

export interface ExitFatal_NotSupported {
  __kind: 'NotSupported'
}

export interface ExitFatal_UnhandledInterrupt {
  __kind: 'UnhandledInterrupt'
}

export interface ExitFatal_CallErrorAsFatal {
  __kind: 'CallErrorAsFatal'
  value: ExitError
}

export interface ExitFatal_Other {
  __kind: 'Other'
  value: string
}
