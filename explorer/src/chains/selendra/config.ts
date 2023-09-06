import {ProcessorConfig, IBlackListConfing } from '../interfaces/processorConfig'
import { getJSON } from '../../utils'

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

export const BLACKLIST_CONFIG: IBlackListConfing = getJSON(
  'assets/blacklist-config.json'
)