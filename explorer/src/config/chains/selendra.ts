import { ProcessorConfig } from '../interfaces/processorConfig'

export const config: ProcessorConfig = {
  chainName: 'selendra',
  prefix: '204',
  dataSource: {
    archive: 'https://archive-graphql.selendra.org/graphql',
    chain: 'wss://archive.selendra.org'
  },
  blockRange: {
    from: 0,
  },
}
export default config
