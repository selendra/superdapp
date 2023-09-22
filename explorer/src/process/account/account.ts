import { SubstrateBlock } from '@subsquid/substrate-processor'
import { Keyring, WsProvider, ApiPromise } from '@polkadot/api'
import {
  encodeId,
  getOriginAccountId,
  processItem,
  unwrapData
} from '../../utils'
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

          actions.push(
            new EnsureAccount(block, item.extrinsic, {
              id: identityId,
              block
            }),
            new EnsureIdentityAction(block, item.extrinsic, {
              id: identityId
            }),
            new GiveJudgementAction(block, item.extrinsic, {
              id: identityId,
              judgement: Judgement.Unknown
            }),
            new SetIdentityAction(block, item.extrinsic, {
              id: identityId,
              web: unwrapData(identitySetData.info.web),
              display: unwrapData(identitySetData.info.display),
              legal: unwrapData(identitySetData.info.legal),
              email: unwrapData(identitySetData.info.email),
              image: unwrapData(identitySetData.info.image),
              pgpFingerprint: identitySetData.info.pgpFingerprint
                ? toHex(identitySetData.info.pgpFingerprint)
                : null,
              riot: unwrapData(identitySetData.info.riot),
              twitter: unwrapData(identitySetData.info.twitter),
              additional: identitySetData.info.additional.map((a: any) => ({
                name: unwrapData(a[0])!,
                value: unwrapData(a[1])
              }))
            })
          )
          break
        }  case 'Identity.provide_judgement': {
          if (!item.call.success) break

          const judgementGivenData = api.calls.callProvideJudgementIdentity(ctx, item.call)

          const identityId = encodeId(judgementGivenData.target, config.prefix)

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
              new GiveJudgementAction(block, item.extrinsic, {
                  id: identityId,
                  judgement,
              })
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
    if (id == null) return

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
  if (accounts == null) return

  for (let i = 0; i < accounts.length; i++) {
    const actions: Action[] = []
    const id = encodeId(accounts[i], config.prefix)
    actions.push(
      new EnsureAccount(block, undefined, {
        id,
        block
      })
    )

    await Action.process(ctx, actions)
  }
}
