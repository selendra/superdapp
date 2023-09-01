import type { ProcessorConfig } from './interfaces/processorConfig'
import {ChainApi} from './interfaces/chainApi'

import fs from 'fs'

export const BLACKLIST_CONFIG: IBlackListConfing = getJSON(
  'assets/blacklist-config.json'
)

interface IBlackListConfing {
  blacklistItems: string[]
  argsStringMaxLengthLimit: number
}

function getJSON(filename: string) {
  const data = fs.readFileSync(filename).toString()
  //console.log(data)
  return JSON.parse(data)
}

export function getChainConfig(): {config: ProcessorConfig, api: ChainApi} {
  switch (process.env.CHAIN) {
    case 'selendra':
      return require('./chains/selendra')
    default:
      throw new Error(`Unsupported chain ${process.env.CHAIN}`)
  }
}
