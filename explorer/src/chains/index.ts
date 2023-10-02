import { ProcessorConfig } from '../interfaces/processorConfig'

export { api } from "./selendra"

export function getChain(): { config: ProcessorConfig } {
  switch (process.env.CHAIN) {
    case 'selendra':
      return require('./selendra')
    default:
      throw new Error(`Unsupported chain ${process.env.CHAIN}`)
  }
}

export const { config } = getChain() 
export const chainName = config.chainName
export const ss58Format = config.prefix
export const token = config.token
