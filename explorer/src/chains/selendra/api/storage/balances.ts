import {
  BalancesAccountStorage,
  BalancesTotalIssuanceStorage,
  SystemAccountStorage
} from '../../types/storage'
import { Block, ChainContext } from '../../types/support'
import { UnknownVersionError } from '../../../../utils'

export async function getBalancesAccountBalances(
  ctx: ChainContext,
  block: Block,
  accounts: Uint8Array[]
) {
  const storage = new BalancesAccountStorage(ctx, block)
  const mapData = (d: { free: bigint; reserved: bigint }) => ({
    free: d.free,
    reserved: d.reserved
  })

  if (storage.isV1050) {
    return storage.getManyAsV1050(accounts).then((data) => data.map(mapData))
  }
  if (storage.isV9420) {
    return storage.getManyAsV9420(accounts).then((data) => data.map(mapData))
  } else {
    throw new UnknownVersionError(storage.constructor.name)
  }
}

export async function getSystemAccountBalances(
  ctx: ChainContext,
  block: Block,
  accounts: Uint8Array[]
) {
  const storage = new SystemAccountStorage(ctx, block)
  if (!storage.isExists) return undefined

  const mapData = (d: { data: { free: bigint; reserved: bigint } }) => ({
    free: d.data.free,
    reserved: d.data.reserved
  })

  if (storage.isV1050) {
    return storage.getManyAsV1050(accounts).then((data) => data.map(mapData))
  } else if (storage.isV2025) {
    return storage.getManyAsV2025(accounts).then((data) => data.map(mapData))
  } else if (storage.isV2028) {
    return storage.getManyAsV2028(accounts).then((data) => data.map(mapData))
  } else if (storage.isV2030) {
    return storage.getManyAsV2030(accounts).then((data) => data.map(mapData))
  } else if (storage.isV9420) {
    return storage.getManyAsV9420(accounts).then((data) => data.map(mapData))
  } else {
    throw new UnknownVersionError(storage.constructor.name)
  }
}

export async function getTotalIssuance(ctx: ChainContext, block: Block) {
  const storage = new BalancesTotalIssuanceStorage(ctx, block)
  if (!storage.isExists) return undefined

  if (storage.isV1020) {
    return await storage.getAsV1020()
  }

  throw new UnknownVersionError(storage.constructor.name)
}
