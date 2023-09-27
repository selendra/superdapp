import {
  ProcessorConfig,
  IBlackListConfing,
  IGenesisConfing,
  IAccountConfing
} from '../../interfaces/processorConfig'
import fs from 'fs'

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
  sentry: process.env.SENTRY,
  sourceCodeEnabled: (process.env.SOURCE_CODE_ENABLED || "false") === "true",
  verifierEndpoint: process.env.VERIFIER_ENDPOINT || "http://127.0.0.1:3001",
}
