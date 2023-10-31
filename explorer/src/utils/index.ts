export * from './errors'
export * from './misc'
export * from './contractType'
import { Entity } from '@subsquid/typeorm-store'

export type Args = Record<string, string> | Record<string, Record<string, string>>
export type OptEntity = Entity | undefined