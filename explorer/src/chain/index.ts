import { assertNotNull } from '@subsquid/substrate-processor'
import {
  ProcessorConfig,
  ChainApi,
  IChainData,
  IBlackListConfig
} from './interfaces'
import fs from 'fs'

export const contractCallTimeout = process.env.CONTRACT_CALL_TIMEOUT
  ? parseInt(process.env.CONTRACT_CALL_TIMEOUT)
  : 6000

function getJSON(filename: string) {
  const data = fs.readFileSync(filename).toString()
  return JSON.parse(data)
}

function getChain(): { api: ChainApi; config: ProcessorConfig } {
  const chainName = assertNotNull(
    process.env.CHAIN,
    'Missing env variable CHAIN'
  )
  const chainNameKebab = chainName.split('_').join('-')
  const chainAPI = require(`./${chainNameKebab}`).default

  let chainsConfig: IChainData[]
  try {
    const data = fs.readFileSync('assets/chains-data.json')
    chainsConfig = JSON.parse(data.toString())
  } catch (err) {
    console.error("Can't read chain config from 'assets/chains-data.json : ")
    throw err
  }

  const chainConfig = chainsConfig.find((chain) => chain.network === chainName)
  if (!chainConfig) {
    throw new Error(`Chain ${chainName} not found in assets/chains-data.json`)
  }

  let processorConfig: ProcessorConfig = {
    chainName: chainConfig.network,
    symbols: chainConfig.symbols[0],
    dataSource: {
      archive: 'https://archive-graphql.selendra.org/graphql',
      chain: 'wss://rpc1.selendra.org'
    },
    prefix: chainConfig.prefix ? chainConfig.prefix : 42,
    blockRange: {
      // from: 705300
      // from: 761799
      from: 21000
    },
    sourceCodeEnabled: (process.env.SOURCE_CODE_ENABLED || "false") === "true",
  }

  if (chainAPI.customConfig) {
    Object.assign(processorConfig, chainAPI.customConfig)
  }

  return { api: chainAPI.api, config: processorConfig }
}

export const BLACKLIST_CONFIG: IBlackListConfig = getJSON(
  'assets/blacklist-config.json'
)

export const chain = getChain()
