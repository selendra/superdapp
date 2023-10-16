import { TypeormDatabase } from '@subsquid/typeorm-store'
import { processor } from '../processor'
import { encodeAddress } from '../utils'
import { chain } from '../chain'
import { EvmContract } from '../model'
import { EnsureEvmContract } from '../action'
import { Action } from '../action/base'

export async function process(ctx: any) {
  const actions: Action[] = []

  for (const { items, header } of ctx.blocks) {
    for (const item of items) {
      if (item.kind === 'event' && item.event.phase === 'ApplyExtrinsic') {
        switch (item.name) {
          case 'Ethereum.Executed': {
            actions.push(
              new EnsureEvmContract(header, item.event.extrinsic, {
                item: item,
              })
            )
            break
          }
        }
      }
    }
  }

  await Action.process(ctx, actions)
}
