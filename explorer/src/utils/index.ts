import { decodeHex, toHex, SubstrateBlock } from '@subsquid/substrate-processor'
export * from './common'

const { Keyring } = require('@polkadot/api')
const keyring = new Keyring()

export function getOriginAccountId(origin: any) {
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

export function processItem(
  blocks: any,
  fn: (block: SubstrateBlock, item: any) => void
) {
  for (let block of blocks) {
    for (let item of block.items) {
      fn(block.header, item)
    }
  }
}

export function encodeId(id: Uint8Array, prefix: string | number | undefined) {
  return prefix != null ? keyring.encodeAddress(id, prefix) : toHex(id)
}

export function decodeId(id: string, prefix: string | number | undefined) {
  return prefix != null ? keyring.decodeAddress(id) : decodeHex(id)
}

export class UnknownVersionError extends Error {
  constructor(name: string) {
    super(`There is no relevant version for ${name}`)
  }
}

export class DataNotDecodableError extends Error {
  constructor(name: string, data: any) {
    super(`Can't decode ${data} of ${name}`)
  }
}
