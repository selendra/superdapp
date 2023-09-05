import {ProcessorConfig} from '../interfaces/processorConfig'

export const config: ProcessorConfig = {
  chainName: 'selendra',
  prefix: '204',
  dataSource: {
    archive: 'https://archive-graphql.selendra.org/graphql',
    chain: 'wss://rpc1.selendra.org'
  },
  blockRange: {
      from: 0,
  },
}
