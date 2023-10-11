import { assertNotNull } from '@subsquid/substrate-processor'
import { ProcessorConfig, ChainApi, IChainData, IBlackListConfing } from './interfaces'
import fs from 'fs'

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
    dataSource: {
      archive: 'https://archive-graphql.selendra.org/graphql',
      chain: 'wss://rpc1.selendra.org'
    },
    prefix: chainConfig.prefix,
    blockRange: {
      from: 0
    },
  }

  if (chainAPI.customConfig) {
    Object.assign(processorConfig, chainAPI.customConfig)
  }

  return { api: chainAPI.api, config: processorConfig }
}

export const BLACKLIST_CONFIG: IBlackListConfing = getJSON(
  'assets/blacklist-config.json'
)

export const chain = getChain()
