import { Keyring } from '@polkadot/api'
import { SubstrateExtrinsicSignature } from '@subsquid/substrate-processor'
import { toHex } from '@subsquid/util-internal-hex'
import { ss58Format } from '../chains'

const keyring = new Keyring()

export function encodeAddress(id: Uint8Array | string) {
  return keyring.encodeAddress(id, Number(ss58Format))
}

export function decodeAddress(id: string) {
  return keyring.decodeAddress(id)
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

export function getSignature(signature: SubstrateExtrinsicSignature): string {
  const { value } = <Signature>signature.signature
  return value
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
