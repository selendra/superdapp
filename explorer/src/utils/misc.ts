import { Keyring } from '@polkadot/api'

const keyring = new Keyring()

export function encodeId(id: Uint8Array | string, prefix: string | number) {
  return keyring.encodeAddress(id, Number(prefix))
}

export function decodeId(id: string, prefix: string | number | undefined) {
  return keyring.decodeAddress(id)
}

export class UnknownVersionError extends Error {
  constructor(name: string) {
    super(`There is no relevant version for ${name}`)
  }
}


