import type { SubstrateBatchProcessor } from '@subsquid/substrate-processor'

import type kusama from './kusama/api'

export type ChainApi =
  | typeof kusama

export interface ProcessorConfig {
  chainName: string
  dataSource: Parameters<SubstrateBatchProcessor<any>['setDataSource']>[0]
  prefix?: number
  blockRange?: Parameters<SubstrateBatchProcessor<any>['setBlockRange']>[0],
  typesBundle?: Parameters<SubstrateBatchProcessor<any>['setTypesBundle']>[0]
}

export interface IChainData {
  prefix?: number
  network: string
  displayName: string
  symbols: string[]
  decimals: string[]
  archiveName: string
}
