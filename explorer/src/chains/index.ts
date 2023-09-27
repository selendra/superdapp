import { ProcessorConfig } from '../interfaces/processorConfig'
export * from './selendra'

export function getChain(): { config: ProcessorConfig } {
    switch (process.env.CHAIN) {
      case 'selendra':
        return require('./selendra')
      default:
        throw new Error(`Unsupported chain ${process.env.CHAIN}`)
    }
  }