import {
  EnsureEvmContract,
  EnsureEvmAccount,
  evmContractErc20
} from '../action'
import { Action } from '../action/base'
import * as erc20 from '../abi/erc20'
import * as erc721 from '../abi/erc721'

export async function process(ctx: any) {
  const actions: Action[] = []

  for (const { items, header } of ctx.blocks) {
    for (const item of items) {
      if (item.kind === 'event' && item.event.phase === 'ApplyExtrinsic') {
        switch (item.name) {
          case 'Ethereum.Executed': {
            actions.push(
              new EnsureEvmAccount(header, item.event.extrinsic, {
                item: item
              }),
              new EnsureEvmContract(header, item.event.extrinsic, {
                item: item
              })
            )
            break
          }
          case 'EVM.Log': {
            switch ((item.event.args.log || item.event.args).topics[0]) {
              case erc20.events.Transfer.topic:
              case erc721.events.Transfer.topic:
                try {
                  actions.push(
                    new evmContractErc20(header, item.event.extrinsic, {
                      item: item
                    })
                  )
                } catch (error) {
                  try {
                    actions.push(
                      new evmContractErc20(header, item.event.extrinsic, {
                        item: item
                      })
                    )
                  } catch (error) {
                    console.log(error)
                  }
                }
            }
            break
          }
        }
      }
    }
  }

  await Action.process(ctx, actions)
}
