import { TypeormDatabase } from '@subsquid/typeorm-store'
import { StoreWithCache } from '@belopash/squid-tools'
import { encodeId, getOriginAccountId, processItem } from '../../utils'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { getChain, ACCOUNT_CONFIG } from '../../chains'
import { Account, Identity, Judgement, IdentitySub } from '../../model'
import { Action, LazyAction } from './action/base'
import assert from 'assert'
import { EnsureAccount, TransferAction, RewardAction } from './action'
import {
  AddIdentitySubAction,
  ClearIdentityAction,
  EnsureIdentityAction,
  EnsureIdentitySubAction,
  GiveJudgementAction,
  KillIdentityAction,
  RemoveIdentitySubAction,
  RenameSubAction,
  SetIdentityAction
} from './action/identity'
import { toHex } from '@subsquid/substrate-processor'
import { Context } from '..'

const { api, config } = getChain()

export async function processAccounts(ctx: Context): Promise<void> {
  let store = StoreWithCache.create(ctx.store)

  for (const block of ctx.blocks) {
    for (const item of block.items) {
      function getName() {
        if (item.kind === 'event') {
          const { name } = item.event;
          return name
        }else if (item.kind === 'call') {
          const { name } = item.call
          return name
        } else {
          return ""
        }
      }
      let name = getName()  
      await processAccountItem(block.header, item, name)
    }
  }

  async function processAccountItem(block: SubstrateBlock, item: any, name: any) {
    if (ACCOUNT_CONFIG.accountItems.includes(name)) {
      const actions: Action[] = []
      try {
        if (name == 'Balances.Transfer') {
          const data = api.events.getTransferAccounts(ctx, item.event)

          const fromId = encodeId(data[0], config.prefix)
          const toId = encodeId(data[1], config.prefix)

          actions.push(
              new EnsureAccount(block, item.event.extrinsic, {
                  id: fromId,
                  block,
              }),
              new EnsureAccount(block, item.event.extrinsic, {
                  id: toId,
                  block,
              }),
          )
        }
      } catch (error) {
        ctx.log.warn('Account cannot be process.')
        console.dir(error, { depth: null })
      }
    
      await Action.process(ctx, actions)
      console.log(actions)
    }
  }
}
