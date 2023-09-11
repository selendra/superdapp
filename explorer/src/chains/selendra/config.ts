import {
  ProcessorConfig,
  IBlackListConfing,
  IBalanceConfing
} from '../interfaces/processorConfig'
import fs from 'fs'

function getJSON(filename: string) {
  const data = fs.readFileSync(filename).toString()
  return JSON.parse(data)
}

export const config: ProcessorConfig = {
  chainName: 'selendra',
  prefix: '204',
  dataSource: {
    archive: 'https://archive-graphql.selendra.org/graphql',
    chain: 'wss://rpc1.selendra.org'
  },
  blockRange: {
    from: 0
  }
}

export const BLACKLIST_CONFIG: IBlackListConfing = getJSON(
  'assets/blacklist-config.json'
)

export const BALANCE_CONFIG: IBalanceConfing = getJSON(
  'assets/balance-config.json'
)
