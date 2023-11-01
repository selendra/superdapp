export * from './errors'
export * from './misc'
export * from './contractType'
import { Entity } from '@subsquid/typeorm-store'

export type Args = Record<string, string> | Record<string, Record<string, string>>

export type ExtrinsicArg =
  | Record<string, string>
  | Record<string, Buffer>
  | Record<string, Uint8Array>
  | Record<string, undefined>

export type OptEntity = Entity | undefined
