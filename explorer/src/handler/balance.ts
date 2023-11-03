import { encodeAddress, getOriginAccountId } from '../utils'
import { chain } from '../chain'
import { Action } from '../action/base'
import { EnsureAccount, TransferAction } from '../action'

export async function process(ctx: any) {
  const actions: Action[] = []

  for (const { items, header } of ctx.blocks) {
    for (const item of items as any) {
      if (item.kind === 'call') {
        const signer = getOriginAccountId(item.call.origin)
        const address = signer ? encodeAddress(signer) : undefined

        if (address == undefined) return
        
        actions.push(
          new EnsureAccount(header, item.event.extrinsic, {
            id: address
          }),
        )
      }

      switch (item.name) {
        case 'Balances.Transfer': {
          const data = chain.api.events.balances.Transfer.decode(
            ctx,
            item.event
          )

          const fromId = encodeAddress(data.from)
          const toId = encodeAddress(data.to)

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: fromId
            }),
            new EnsureAccount(header, item.event.extrinsic, {
              id: toId
            }),
            new TransferAction(header, item.event.extrinsic, {
              id: item.event.id,
              fromId,
              toId,
              amount: data.amount,
              success: true
            })
          )
          break
        }
        case 'Balances.BalanceSet': {
          const { who } = chain.api.events.balances.BalanceSet.decode(
            ctx,
            item.event
          )
          const fromId = encodeAddress(who)

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: fromId
            })
          )
          break
        }
        case 'Balances.Endowed': {
          const { account } = chain.api.events.balances.BalancesEndowed.decode(
            ctx,
            item.event
          )
          const fromId = encodeAddress(account)

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: fromId
            })
          )
          break
        }
        case 'Balances.Deposit': {
          const { who } = chain.api.events.balances.BalancesDeposit.decode(
            ctx,
            item.event
          )
          const fromId = encodeAddress(who)

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: fromId
            })
          )
          break
        }
        case 'Balances.Reserved': {
          const { who } = chain.api.events.balances.BalancesReserved.decode(
            ctx,
            item.event
          )
          const fromId = encodeAddress(who)

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: fromId
            })
          )
          break
        }
        case 'Balances.Unreserved': {
          const { who } = chain.api.events.balances.BalancesUnreserved.decode(
            ctx,
            item.event
          )
          const fromId = encodeAddress(who)

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: fromId
            })
          )
          break
        }
        case 'Balances.Withdraw': {
          const { who } = chain.api.events.balances.BalancesWithdraw.decode(
            ctx,
            item.event
          )
          const fromId = encodeAddress(who)

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: fromId
            })
          )

          break
        }
        case 'Balances.Slashed': {
          const { who } = chain.api.events.balances.BalancesSlashed.decode(
            ctx,
            item.event
          )
          const fromId = encodeAddress(who)

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: fromId
            })
          )
          break
        }
        case 'Balances.ReserveRepatriated': {
          const { from, to } =
            chain.api.events.balances.BalancesReserveRepatriated.decode(
              ctx,
              item.event
            )
          const fromId = encodeAddress(from)
          const toId = encodeAddress(to)

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: fromId
            }),
            new EnsureAccount(header, item.event.extrinsic, {
              id: toId
            })
          )
          break
        }
      }
    }
  }

  await Action.process(ctx, actions)
}
