import { Entity, Store } from '@subsquid/typeorm-store'
import { Keyring } from '@polkadot/api'
import {
  decodeHex,
  toHex,
  CommonHandlerContext,
  SubstrateBlock,
  SubstrateExtrinsicSignature
} from '@subsquid/substrate-processor'
import { chain, BLACKLIST_CONFIG } from '../chain'
import { Account, ActivityType, ContractActivity, CounterLevel, DecodedActivityArg, DecodedContractActivity, ItemsCounter, ItemType } from '../model'
import { ProcessorContext } from '../processor'
import { OptEntity } from '.'
import { DecodedElement } from '../abi/wasmDecoder/types'

const keyring = new Keyring()

export function encodeAddress(address: Uint8Array | string) {
  return keyring.encodeAddress(address, chain.config.prefix)
}

export function decodeAddress(address: string) {
  return keyring.decodeAddress(address)
}

export function getOriginAccountId(origin: any): Uint8Array | undefined {
  if (
    origin &&
    origin.__kind === 'system' &&
    origin.value.__kind === 'Signed'
  ) {
    const id = origin.value.value
    if (id.__kind === 'Id') {
      return decodeHex(id.value)
    } else {
      return decodeHex(id)
    }
  } else {
    return undefined
  }
}

export function toEntityMap<T extends { id: string }>(
  entities: T[]
): Map<string, T> {
  return new Map(entities.map((e) => [e.id, e]))
}

export function* splitIntoBatches<T>(
  list: T[],
  maxBatchSize: number
): Generator<T[]> {
  if (list.length <= maxBatchSize) {
    yield list
  } else {
    let offset = 0
    while (list.length - offset > maxBatchSize) {
      yield list.slice(offset, offset + maxBatchSize)
      offset += maxBatchSize
    }
    yield list.slice(offset)
  }
}

export function unwrapData(data: { __kind: string; value?: Uint8Array }) {
  switch (data.__kind) {
    case "None":
      return null;
    case "BlakeTwo256":
    case "Sha256":
    case "Keccak256":
    case "ShaThree256":
      return Buffer.from(data.value!).toString("hex");
    default:
      return Buffer.from(data.value!)
        .toString("utf-8")
        .replace(/\u0000/g, "");
  }
}

function parseArgsHelper(srcNode: any, res: Set<string>): void {
  if (!srcNode) return

  const handleVertex = (val: any) => {
    if (ArrayBuffer.isView(val) && val.constructor.name === 'Uint8Array') {
      const tr = toHex(val as Uint8Array)
      if (tr.length <= BLACKLIST_CONFIG.argsStringMaxLengthLimit) res.add(tr)
      return
    }
    if (ArrayBuffer.isView(val) && val.constructor.name !== 'Uint8Array') {
      const tr = val.toString()
      if (tr.length <= BLACKLIST_CONFIG.argsStringMaxLengthLimit) res.add(tr)
      return
    }

    switch (typeof val) {
      case 'string':
        if (
          val.length > 0 &&
          val.length <= BLACKLIST_CONFIG.argsStringMaxLengthLimit
        ) {
          res.add(val)
        }
        break
      case 'number':
      case 'bigint':
        res.add((<any>val).toString())
        break
    }
  }

  if (
    Array.isArray(srcNode) ||
    (!Array.isArray(srcNode) &&
      !ArrayBuffer.isView(srcNode) &&
      typeof srcNode === 'object')
  ) {
    // It's array or object
    for (const key in srcNode) parseArgsHelper(srcNode[key], res)
  } else {
    // It's primitive value
    handleVertex(srcNode)
  }
}

export function getParsedArgs(srcArgs: any): string[] {
  let result: Set<string> = new Set()
  parseArgsHelper(srcArgs, result)
  return [...result.values()]
}

interface ICounterNameProps {
  type: ItemType
  level: CounterLevel
  palletName?: string
  itemName?: string
}

export class ItemsLogger {
  private static itemsMap = new Map<string, ItemsCounter>()
  private static initilized = false

  static isInitialized = () => this.initilized

  static async init(ctx: CommonHandlerContext<Store>) {
    const items = await ctx.store.find(ItemsCounter)
    for (const item of items) {
      this.itemsMap.set(item.id, item)
    }
    this.initilized = true
    ctx.log.info('Items counters were initialized')
  }

  private static _add(item: ICounterNameProps) {
    const { level, type, palletName, itemName } = item
    let id = type.toString()
    if (palletName) id += `.${palletName}`
    if (itemName) id += `.${itemName}`

    const curState =
      this.itemsMap.get(id) ?? new ItemsCounter({ id, total: 0, type, level })
    curState.total += 1
    this.itemsMap.set(id, curState)
  }

  private static _addItem(item: Omit<ICounterNameProps, 'level'>) {
    const { itemName, palletName, type } = item
    this._add({ type, palletName, itemName, level: CounterLevel.Item })
    this._add({ type, palletName, level: CounterLevel.Pallet })
    this._add({ type, level: CounterLevel.Global })
  }

  static addEvent = (item: Omit<ICounterNameProps, 'level' | 'type'>) =>
    this._addItem({ type: ItemType.Events, ...item })

  static addCall(
    item: Omit<ICounterNameProps, 'level' | 'type'>,
    isMainInExtrinsic: boolean
  ) {
    this._addItem({ type: ItemType.Calls, ...item })
    if (isMainInExtrinsic) this._addItem({ type: ItemType.Extrinsics, ...item })
  }

  static async saveToDB(ctx: CommonHandlerContext<Store>) {
    await ctx.store.save([...this.itemsMap.values()])
    //ctx.log.info('Items counters were saved')
  }
}

export function dataToString(data: unknown): string {
  if (typeof data === 'string') {
    return data
  }
  if (
    typeof data === 'bigint' ||
    typeof data === 'boolean' ||
    typeof data === 'number'
  ) {
    return data.toString()
  }
  if (Buffer.isBuffer(data)) {
    return toHex(data)
  }
  if (data === undefined) {
    return ''
  }
  throw new Error(
    `Conversion of arg type [${typeof data}] to string is not supported`
  )
}

interface BalanceData {
  free: bigint
  reserved: bigint
}

export async function getBalances(
  ctx: ProcessorContext,
  block: SubstrateBlock,
  id: string
): Promise<(BalanceData | undefined) | undefined> {
  const accountIdsU8 = decodeAddress(id)
  return (
    (await chain.api.storages.balances.getSystemAccountBalances.decode(
      ctx,
      block,
      accountIdsU8
    )) ||
    (await chain.api.storages.balances.getBalancesAccountBalances.decode(
      ctx,
      block,
      accountIdsU8
    ))
  )
}

interface Signature {
  __kind: string
  value: string
}

export function getSignerAddress(
  signature: SubstrateExtrinsicSignature
): string {
  // Disabling linter as address.__kind comes as Id, Index, Address32 or Address20
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { __kind, value } = <Signature>signature.address
  switch (__kind) {
    case 'Id':
    case 'Address32':
    case 'Address20':
      return encodeAddress(value)
    default:
      throw new Error(`Address of type [${__kind}] not supported`)
  }
}


export interface ContractInstantiatedArgs {
  code?: string
  data?: string
  salt?: string
  gasLimit?: bigint
  value?: bigint
  codeHash?: string
}

export interface ContractCodeStoredArgs {
  data?: string
  codeHash?: string
}

export interface ContractCodeUpdatedArgs {
  data?: string
  newCodeHash?: string
  oldCodeHash?: string
}

export function createActivity(
  extrinsicEntity: string,
  id: string,
  type: ActivityType,
  to?: Account,
  createdAt?: Date,
  from?: Account,
  args?:
    | ContractCodeStoredArgs
    | ContractCodeUpdatedArgs
    | ContractInstantiatedArgs
): ContractActivity {
  return new ContractActivity({
    id: `${id}-${type}`,
    type,
    to,
    createdAt: createdAt,
    from,
    extrinsicHash: extrinsicEntity,
    args: args
  })
}


export async function saveAll<E extends Entity | undefined>(
  store: Store,
  entities: E[]
): Promise<void> {
  for (const entity of entities) {
    if (entity !== undefined) {
      await store.save(entity)
    }
  }
}

export async function decodeData(
  data: string | Uint8Array | Buffer | undefined,
  cb: (data: string | Uint8Array | Buffer) => Promise<void>,
): Promise<void> {
  if (chain.config.sourceCodeEnabled && data) {
    try {
      await cb(data)
    } catch (error) {
      const { message } = <Error>error
      console.log(message)
    }
  }
}

export function addDecodedActivityEntities({
  entities,
  decodedElement,
  activityEntity
}: {
  entities: OptEntity[]
  decodedElement?: DecodedElement
  activityEntity: ContractActivity
}): void {
  if (decodedElement) {
    const decodedElementEntity = new DecodedContractActivity({
      id: activityEntity.id,
      name: decodedElement.name,
      activity: activityEntity
    })

    entities.push(decodedElementEntity)

    for (const arg of decodedElement.args) {
      entities.push(
        new DecodedActivityArg({
          id: `${decodedElementEntity.id}-${arg.name}`,
          decodedActivity: decodedElementEntity,
          ...arg
        })
      )
    }
  }
}