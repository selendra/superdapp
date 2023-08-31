import { ProcessorConfig } from '../processorConfig'

const config: ProcessorConfig = {
  chainName: 'selendra',
  prefix: '204',
  dataSource: {
    archive: 'https://archive-graphql.selendra.org/graphql',
    chain: 'wss://archive.selendra.org'
  }
}

export default config
