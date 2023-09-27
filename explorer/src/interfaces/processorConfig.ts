import { SubstrateProcessor } from '@subsquid/substrate-processor'

export interface IBlackListConfing {
  blacklistItems: string[]
  argsStringMaxLengthLimit: number
}

export interface IAccountConfing {
  accountItems: string[]
}

export interface IGenesisConfing {
  accounts: string[]
}

export interface ProcessorConfig {
  chainName: string
  prefix: number | string | 42
  dataSource: Parameters<SubstrateProcessor<any>['setDataSource']>[0]
  blockRange?: Parameters<SubstrateProcessor<any>['setBlockRange']>[0]
  genesisAccount?: IGenesisConfing
  sentry?: string
  sourceCodeEnabled: boolean,
  verifierEndpoint: string,
}
