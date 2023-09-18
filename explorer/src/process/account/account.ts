import { TypeormDatabase } from '@subsquid/typeorm-store'
import { StoreWithCache } from '@belopash/squid-tools'
import { encodeId, getOriginAccountId, processItem } from '../../utils'
import {
  BatchContext,
  SubstrateBlock,
  SubstrateExtrinsic
} from '@subsquid/substrate-processor'
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
import { Context, CallItem } from '..'

const { api, config } = getChain()

export async function processAccounts(ctx: Context): Promise<void> {
  for (const block of ctx.blocks) {
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
        case 'Identity.rename_sub': {
          if (!item.call.success) break
          const renameSubData = api.calls.callRenameSubIdentity(ctx, item.call)

          const subId = encodeId(renameSubData.sub, config.prefix)
          const sub = ctx.store.get(IdentitySub, subId)

          actions.push(
            new RenameSubAction(block, item.extrinsic, {
              sub: () => sub,
              name: unwrapData(renameSubData.data)!
            })
          )
          break
        }
        case 'Identity.set_subs': {
          if (!item.call.success) break

          const setSubsData = api.calls.callSetSubIdentity(ctx, item.call)

          const origin = getOriginAccountId(item.call.origin)
          if (origin == null) break

          const identityId = encodeId(origin, config.prefix)
          const identity = ctx.store.get(Identity, identityId)

          for (const subData of setSubsData.subs) {
            const subId = encodeId(subData[0], config.prefix)
            const sub = ctx.store.get(IdentitySub, subId)

            const account = ctx.store.findOneOrFail(Account, subId)

            actions.push(
              new EnsureAccount(block, item.extrinsic, {
                id: subId,
                block
              }),
              new EnsureIdentitySubAction(block, item.extrinsic, {
                sub: () => sub,
                account: () => account,
                id: subId
              }),
              new AddIdentitySubAction(block, item.extrinsic, {
                identity: () => identity,
                sub: () => sub
              }),
              new RenameSubAction(block, item.extrinsic, {
                sub: () => sub,
                name: unwrapData(subData[1])
              })
            )
          }

          break
        }
        case 'Identity.provide_judgement': {
          if (!item.call.success) break

          const judgementGivenData = api.calls.callProvideJudgementIdentity(
            ctx,
            item.call
          )

          const identityId = encodeId(judgementGivenData.target, config.prefix)
          const identity = ctx.store.get(Identity, identityId)

          const getJudgment = () => {
            const kind = judgementGivenData.judgement.__kind
            switch (kind) {
              case Judgement.Erroneous:
              case Judgement.FeePaid:
              case Judgement.KnownGood:
              case Judgement.LowQuality:
              case Judgement.OutOfDate:
              case Judgement.Reasonable:
              case Judgement.Unknown:
                return kind as Judgement
              default:
                throw new Error(`Unknown judgement: ${kind}`)
            }
          }
          const judgement = getJudgment()

          actions.push(
            new LazyAction(block, item.extrinsic, async (ctx) => {
              const a: Action[] = []

              const account = ctx.store.findOneOrFail(Account, identityId)

              a.push(
                new EnsureAccount(block, item.extrinsic, {
                  id: identityId,
                  block
                }),
                new EnsureIdentityAction(block, item.extrinsic, {
                  identity: () => identity,
                  account: () => account,
                  id: identityId
                })
              )

              return a
            }),
            new GiveJudgementAction(block, item.extrinsic, {
              identity: () => identity,
              judgement
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
          const identity = ctx.store.get(Identity, identityId)

          const account = ctx.store.findOneOrFail(Account, identityId)

          actions.push(
            new EnsureAccount(block, item.extrinsic, {
              id: identityId,
              block
            }),
            new EnsureIdentityAction(block, item.extrinsic, {
              identity: () => identity,
              account: () => account,
              id: identityId
            }),
            new GiveJudgementAction(block, item.extrinsic, {
              identity: () => identity,
              judgement: Judgement.Unknown
            }),
            new SetIdentityAction(block, item.extrinsic, {
              identity: () => identity,
              web: unwrapData(identitySetData.web),
              display: unwrapData(identitySetData.display),
              legal: unwrapData(identitySetData.legal),
              email: unwrapData(identitySetData.email),
              image: unwrapData(identitySetData.image),
              pgpFingerprint: identitySetData.pgpFingerprint
                ? toHex(identitySetData.pgpFingerprint)
                : null,
              riot: unwrapData(identitySetData.riot),
              twitter: unwrapData(identitySetData.twitter),
              additional: identitySetData.additional.map((a: any) => ({
                name: unwrapData(a[0])!,
                value: unwrapData(a[1])
              }))
            })
          )

          break
        }
        case 'Identity.add_sub': {
          if (!item.call.success) break

          const subAddedCallData = api.calls.callAddSubIdentity(ctx, item.call)

          const origin = getOriginAccountId(item.call.origin)
          if (origin == null) break

          const identityId = encodeId(origin, config.prefix)
          const identity = ctx.store.get(Identity, identityId)

          const subId = encodeId(subAddedCallData.sub, config.prefix)
          const sub = ctx.store.get(IdentitySub, subId)

          const account = ctx.store.findOneOrFail(Account, subId)

          actions.push(
            new EnsureAccount(block, item.extrinsic, {
              id: subId,
              block
            }),
            new EnsureIdentitySubAction(block, item.extrinsic, {
              sub: () => sub,
              account: () => account,
              id: subId
            }),
            new AddIdentitySubAction(block, item.extrinsic, {
              identity: () => identity,
              sub: () => sub
            }),
            new RenameSubAction(block, item.extrinsic, {
              sub: () => sub,
              name: unwrapData(subAddedCallData.data)
            })
          )

          break
        }
        case 'Identity.clear_identity': {
          if (!item.call.success) break

          const origin = getOriginAccountId(item.call.origin)
          if (origin == null) break

          const identityId = encodeId(origin, config.prefix)
          const identity = ctx.store.get(Identity, identityId)

          actions.push(
            new ClearIdentityAction(block, item.extrinsic, {
              identity: () => identity
            }),
            new GiveJudgementAction(block, item.extrinsic, {
              identity: () => identity,
              judgement: Judgement.Unknown
            }),
            new LazyAction(block, item.extrinsic, async (ctx) => {
              const a: Action[] = []

              const i = await ctx.store.findOneOrFail(Identity, {
                where: { id: identityId },
                relations: { subs: true }
              })

              for (const s of i.subs) {
                new RemoveIdentitySubAction(block, item.extrinsic, {
                  sub: () => Promise.resolve(s)
                })
              }

              return a
            })
          )

          break
        }
      }
    } catch (error) {
      ctx.log.warn('Account cannot be process.')
      console.dir(error, { depth: null })
    }
  } 
  // else if (item.kind === 'call') {
  //   const id = processBalancesCallItem(item)
  //   actions.push(
  //     new EnsureAccount(
  //       block,
  //       item.event.extrinsic ? item.event.extrinsic : undefined,
  //       {
  //         id: id,
  //         block
  //       }
  //     )
  //   )
  // }

  await Action.process(ctx, actions)
}

function processBalancesCallItem(item: CallItem) {
  const id = getOriginAccountId(item.call.origin)
  return id ? encodeId(id, config.prefix) : undefined
}

function unwrapData(data: { __kind: string; value?: Uint8Array }) {
  switch (data.__kind) {
    case 'None':
      return null
    case 'BlakeTwo256':
    case 'Sha256':
    case 'Keccak256':
    case 'ShaThree256':
      return Buffer.from(data.value!).toString('hex')
    default:
      return Buffer.from(data.value!)
        .toString('utf-8')
        .replace(/\u0000/g, '')
  }
}
