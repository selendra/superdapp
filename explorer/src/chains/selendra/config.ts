import {
  ProcessorConfig,
  IBlackListConfing,
  IGenesisConfing,
  IAccountConfing
} from '../interfaces/processorConfig'
import fs from 'fs'

export const BLACKLIST_CONFIG: IBlackListConfing = getJSON(
  'assets/blacklist-config.json'
)

export const ACCOUNT_CONFIG: IAccountConfing = getJSON(
  'assets/account-config.json'
)

const SELENDRA_GENESIS_ACCOUNT_CONFIG: IGenesisConfing = getJSON(
  'assets/selendra-genesis-account.json'
)

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
  },
  genesisAccount: SELENDRA_GENESIS_ACCOUNT_CONFIG,
  sentry: process.env.SENTRY
}
