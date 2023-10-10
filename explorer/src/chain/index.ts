import { assertNotNull } from '@subsquid/substrate-processor'
import { ProcessorConfig, ChainApi, IChainData } from './interfaces'
import {
  KnownArchivesSubstrate,
  lookupArchive,
} from '@subsquid/archive-registry'
import fs from 'fs'

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
      archive: lookupArchive(
        chainConfig.archiveName as KnownArchivesSubstrate,
        { release: 'FireSquid' }
      ),
    },
    prefix: chainConfig.prefix,
  }

  if (chainAPI.customConfig) {
    Object.assign(processorConfig, chainAPI.customConfig)
  }

  return { api: chainAPI.api, config: processorConfig }
}

export const chain = getChain()
