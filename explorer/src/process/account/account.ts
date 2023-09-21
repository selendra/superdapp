import { SubstrateBlock } from '@subsquid/substrate-processor'
import { Keyring, WsProvider, ApiPromise } from '@polkadot/api'
import { encodeId, getOriginAccountId, processItem } from '../../utils'
import { getChain, ACCOUNT_CONFIG } from '../../chains'
import { Account, Identity, Judgement, IdentitySub } from '../../model'
import { Action, LazyAction } from './action/base'
import {
  EnsureAccount,
  TransferAction,
  RewardAction,
  processBalancesCallItem
} from './action'
import {
  AddIdentitySubAction,
  ClearIdentityAction,
  EnsureIdentityAction,
  EnsureIdentitySubAction,
  GiveJudgementAction,
  RemoveIdentitySubAction,
  RenameSubAction,
  SetIdentityAction
} from './action/identity'
import { toHex } from '@subsquid/substrate-processor'
import { Context, CallItem } from '..'

const { api, config } = getChain()

export async function processAccounts(ctx: Context): Promise<void> {
  for (const block of ctx.blocks) {
    if (block.header.height != 0) {
      for (const item of block.items) {
        function getName() {
          if (item.kind === 'event') {
            const { name } = item.event
            return name
          } else if (item.kind === 'call') {
            const { name } = item.call
            return name
          } else {
            return ''
          }
        }
        let name = getName()
        await processAccountItem(ctx, block.header, item, name)
      }
    } else {
      await getGenesisAccount(ctx, block.header)
    }
  }
}

async function processAccountItem(
  ctx: Context,
  block: SubstrateBlock,
  item: any,
  name: string
) {
  const actions: Action[] = []

  if (ACCOUNT_CONFIG.accountItems.includes(name)) {
    try {
      switch (name) {
        case 'Balances.Transfer': {
          const data = api.events.getTransferAccounts(ctx, item.event)
          const fromId = encodeId(data[0], config.prefix)
          const toId = encodeId(data[1], config.prefix)

          actions.push(
            new EnsureAccount(block, item.event.extrinsic, {
              id: fromId,
              block
            }),
            new EnsureAccount(block, item.event.extrinsic, {
              id: toId,
              block
            }),
            new TransferAction(block, item.event.extrinsic, {
              id: item.event.id,
              fromId,
              toId,
              amount: data[2],
              success: true
            })
          )
          break
        }
        case 'Balances.BalanceSet': {
          const data = api.events.getBalanceSetAccount(ctx, item.event)
          const fromId = encodeId(data, config.prefix)

          actions.push(
            new EnsureAccount(block, item.event.extrinsic, {
              id: fromId,
              block
            })
          )
          break
        }
        case 'Balances.Endowed': {
          const account = api.events.getEndowedAccount(ctx, item.event)
          const fromId = encodeId(account, config.prefix)

          actions.push(
            new EnsureAccount(block, item.event.extrinsic, {
              id: fromId,
              block
            })
          )
          break
        }
        case 'Balances.Deposit': {
          const account = api.events.getDepositAccount(ctx, item.event)
          const fromId = encodeId(account, config.prefix)

          actions.push(
            new EnsureAccount(block, item.event.extrinsic, {
              id: fromId,
              block
            })
          )
          break
        }
        case 'Balances.Reserved': {
          const account = api.events.getReservedAccount(ctx, item.event)
          const fromId = encodeId(account, config.prefix)

          actions.push(
            new EnsureAccount(block, item.event.extrinsic, {
              id: fromId,
              block
            })
          )
          break
        }
        case 'Balances.Unreserved': {
          const account = api.events.getUnreservedAccount(ctx, item.event)
          const fromId = encodeId(account, config.prefix)

          actions.push(
            new EnsureAccount(block, item.event.extrinsic, {
              id: fromId,
              block
            })
          )
          break
        }
        case 'Balances.Withdraw': {
          const account = api.events.getWithdrawAccount(ctx, item.event)
          const fromId = encodeId(account, config.prefix)

          actions.push(
            new EnsureAccount(block, item.event.extrinsic, {
              id: fromId,
              block
            })
          )

          break
        }
        case 'Balances.Slashed': {
          const account = api.events.getSlashedAccount(ctx, item.event)
          const fromId = encodeId(account, config.prefix)

          actions.push(
            new EnsureAccount(block, item.event.extrinsic, {
              id: fromId,
              block
            })
          )
          break
        }
        case 'Balances.ReserveRepatriated': {
          const accounts = api.events.getReserveRepatriatedAccounts(
            ctx,
            item.event
          )
          for (let i = 0; i < accounts.length; i++) {
            const fromId = encodeId(accounts[i], config.prefix)
            actions.push(
              new EnsureAccount(block, item.event.extrinsic, {
                id: fromId,
                block
              })
            )
          }
          break
        }
        case 'Staking.Reward':
        case 'Staking.Rewarded': {
          const e = api.events.getStakingRewarded(ctx, item.event)
          if (e == null) return // skip some old format rewards

          let accountId = encodeId(e.stash, config.prefix)

          actions.push(
            new EnsureAccount(block, item.event.extrinsic, {
              id: accountId,
              block
            }),
            new RewardAction(block, item.event.extrinsic, {
              id: item.event.id,
              accountId,
              amount: e.amount,
              block
            })
          )
          break
        }
        case 'Identity.set_identity': {
          if (!item.call.success) break

          const identitySetData = api.calls.callSetIdentity(ctx, item.call)

          const origin = getOriginAccountId(item.call.origin)
          if (origin == null) break

          const identityId = encodeId(origin, config.prefix)

          const identity = ctx.store.findOne(Identity, {
            where: { id: identityId }
          })

          const account = ctx.store.findOneOrFail(Account, {
            where: { id: identityId }
          })

          actions.push(
            new EnsureAccount(block, item.extrinsic, {
              id: identityId,
              block
            }),
            new EnsureIdentityAction(block, item.extrinsic, {
              identity: () => identity,
              account: () => account,
              id: identityId
            })
            //   new GiveJudgementAction(block, item.extrinsic, {
            //     identity: () => identity,
            //     judgement: Judgement.Unknown
            //   }),
            //   new SetIdentityAction(block, item.extrinsic, {
            //     identity: () => identity,
            //     web: unwrapData(identitySetData.),
            //     display: unwrapData(identitySetData.display),
            //     legal: unwrapData(identitySetData.legal),
            //     email: unwrapData(identitySetData.email),
            //     image: unwrapData(identitySetData.image),
            //     pgpFingerprint: identitySetData.pgpFingerprint
            //       ? toHex(identitySetData.pgpFingerprint)
            //       : null,
            //     riot: unwrapData(identitySetData.riot),
            //     twitter: unwrapData(identitySetData.twitter),
            //     additional: identitySetData.additional.map((a: any) => ({
            //       name: unwrapData(a[0])!,
            //       value: unwrapData(a[1])
            //     }))
            //   })
          )

          break
        }
      }
    } catch (error) {
      ctx.log.warn('Account cannot be process.')
      console.dir(error, { depth: null })
    }
  } else if (item.kind === 'call') {
    const id = processBalancesCallItem(item)
    if(id == null) return

    actions.push(
      new EnsureAccount(block, undefined, {
        id: id,
        block
      })
    )
  }

  await Action.process(ctx, actions)
}

async function getGenesisAccount(ctx: Context, block: SubstrateBlock) {
  const accounts = config.genesisAccount?.accounts
  if(accounts==null) return

  for(let i=0; i < accounts.length; i++){
    const actions: Action[] = []
    const id = encodeId(accounts[i], config.prefix)
    actions.push(
      new EnsureAccount(block, undefined, {
        id,
        block
      }),
    )

    await Action.process(ctx, actions)
  }
}

