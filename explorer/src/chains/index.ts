import { ProcessorConfig } from '../interfaces/processorConfig'
import { ChainProperties, Token } from "../model";
import { Ctx } from "../interfaces/handler";

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

export class ChainPropertiesStore {
  private stored = false

  async save(ctx: Ctx): Promise<void> {
    if (this.stored) {
      return
    }
    try {
      await this._save(ctx)
      this.stored = true
    } catch (error) {
      ctx.log.error(
        <Error>error,
        'Error saving chain properties and token config!'
      )
    }
  }

  private async _save(ctx: Ctx): Promise<void> {
    const { log, store } = ctx
    log.info({ chainName, ss58Format, token }, 'Storing chain properties...')

    const tokenEntity = new Token({
      id: '0',
      tokenDecimals: token.tokenDecimals,
      tokenSymbol: token.tokenSymbol
    })
    const chainPropertiesEntity = new ChainProperties({
      id: 'chain_properties',
      name: chainName,
      token: tokenEntity,
      ss58Format: Number(ss58Format)
    })
    await store.save(tokenEntity)
    await store.save(chainPropertiesEntity)
  }
}
