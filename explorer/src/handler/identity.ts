import { encodeAddress, getOriginAccountId, unwrapData } from '../utils'
import { chain } from '../chain'
import { Action, LazyAction } from '../action/base'
import { EnsureAccount } from '../action'
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
} from '../action/identity'
import { Identity, Judgement } from '../model'
import { toHex } from '@subsquid/substrate-processor'

export async function process(ctx: any) {
  const actions: Action[] = []

  for (const { items, header } of ctx.blocks) {
    for (const item of items as any) {
      switch (item.name) {
        case 'Identity.set_identity': {
          if (!item.call.success) break

          const identitySetData = chain.api.calls.identity.set_identity.decode(
            ctx,
            item.call
          )

          const origin = getOriginAccountId(item.call.origin)
          if (origin == null) break

          const identityId = encodeAddress(origin)

          actions.push(
            new EnsureAccount(header, item.extrinsic, {
              id: identityId
            }),
            new EnsureIdentityAction(header, item.extrinsic, {
              id: identityId
            }),
            new GiveJudgementAction(header, item.extrinsic, {
              id: identityId,
              judgement: Judgement.Unknown
            }),
            new SetIdentityAction(header, item.extrinsic, {
              id: identityId,
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
              additional: identitySetData.additional.map((a) => ({
                name: unwrapData(a[0])!,
                value: unwrapData(a[1])
              }))
            })
          )
          break
        }
        case 'Identity.provide_judgement': {
          if (!item.call.success) break

          const judgementGivenData =
            chain.api.calls.identity.provide_judgement.decode(ctx, item.call)

          const identityId = encodeAddress(judgementGivenData.target)

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
            new GiveJudgementAction(header, item.extrinsic, {
              id: identityId,
              judgement
            })
          )

          break
        }

        case 'Identity.kill_identity': {
          if (!item.call.success) break

          const origin = getOriginAccountId(item.call.origin)
          if (origin == null) break

          const identityId = encodeAddress(origin)

          actions.push(
            new ClearIdentityAction(header, item.extrinsic, {
              id: identityId
            }),
            new GiveJudgementAction(header, item.extrinsic, {
              id: identityId,
              judgement: Judgement.Unknown
            }),
            new LazyAction(header, item.extrinsic, async (ctx) => {
              const a: Action[] = []

              const i = await ctx.store.get(Identity, {
                where: { id: identityId },
                relations: { subs: true }
              })

              if (i == null) return a

              for (const s of i.subs) {
                new RemoveIdentitySubAction(header, item.extrinsic, {
                  sub: () => Promise.resolve(s)
                })
              }

              return a
            }),
            new KillIdentityAction(header, item.extrinsic, {
              id: identityId
            })
          )

          break
        }

        case 'Identity.clear_identity': {
          if (!item.call.success) break

          const origin = getOriginAccountId(item.call.origin)
          if (origin == null) break

          const identityId = encodeAddress(origin)

          actions.push(
            new ClearIdentityAction(header, item.extrinsic, {
              id: identityId
            }),
            new GiveJudgementAction(header, item.extrinsic, {
              id: identityId,
              judgement: Judgement.Unknown
            }),
            new LazyAction(header, item.extrinsic, async (ctx) => {
              const a: Action[] = []

              const i = await ctx.store.get(Identity, {
                where: { id: identityId },
                relations: { subs: true }
              })

              if (i == null) return a

              for (const s of i.subs) {
                new RemoveIdentitySubAction(header, item.extrinsic, {
                  sub: () => Promise.resolve(s)
                })
              }

              return a
            })
          )

          break
        }

        case 'Identity.add_sub': {
          if (!item.call.success) break

          const subAddedCallData = chain.api.calls.identity.add_sub.decode(
            ctx,
            item.call
          )

          const origin = getOriginAccountId(item.call.origin)
          if (origin == null) break

          const identityId = encodeAddress(origin)
          const subId = encodeAddress(subAddedCallData.sub)

          actions.push(
            new EnsureAccount(header, item.extrinsic, {
              id: subId
            }),
            new EnsureIdentitySubAction(header, item.extrinsic, {
              id: subId
            }),
            new AddIdentitySubAction(header, item.extrinsic, {
              identityId,
              subId
            }),
            new RenameSubAction(header, item.extrinsic, {
              id: subId,
              name: unwrapData(subAddedCallData.data)
            })
          )

          break
        }

        case 'Identity.set_subs': {
          if (!item.call.success) break

          const setSubsData = chain.api.calls.identity.set_subs.decode(
            ctx,
            item.call
          )

          const origin = getOriginAccountId(item.call.origin)
          if (origin == null) break

          const identityId = encodeAddress(origin)

          for (const subData of setSubsData.subs) {
            const subId = encodeAddress(subData[0])

            actions.push(
              new EnsureAccount(header, item.extrinsic, {
                id: subId
              }),
              new EnsureIdentitySubAction(header, item.extrinsic, {
                id: subId
              }),
              new AddIdentitySubAction(header, item.extrinsic, {
                identityId,
                subId
              }),
              new RenameSubAction(header, item.extrinsic, {
                id: subId,
                name: unwrapData(subData[1])
              })
            )
          }

          break
        }
        case 'Identity.rename_sub': {
          if (!item.call.success) break

          const renameSubData = chain.api.calls.identity.rename_sub.decode(
            ctx,
            item.call
          )

          const subId = encodeAddress(renameSubData.sub)

          actions.push(
            new RenameSubAction(header, item.extrinsic, {
              id: subId,
              name: unwrapData(renameSubData.data)!
            })
          )

          break
        }
        case 'Identity.remove_sub': {
          const subRemovedData =
            chain.api.events.identity.IdentitySubRemoved.decode(ctx, item.event)

          const subId = encodeAddress(subRemovedData.sub)
          const sub = await ctx.store.get(Identity, {
            where: { id: subId },
            relations: { subs: true }
          })

          if (sub == null) return

          actions.push(
            new RemoveIdentitySubAction(header, item.event.extrinsic, {
              sub: () => sub.getOrFail()
            })
          )

          break
        }
      }
    }
  }

  await Action.process(ctx, actions)
}
