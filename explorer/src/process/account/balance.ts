import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { getChain, BALANCE_CONFIG } from '../../chains'
import { isOneDay, saveChainState } from '../../chains/chainState'
import { Account, ChainState } from '../../model'
import { decodeId, encodeId, getOriginAccountId } from '../../utils'
import { CallItem, Context } from '..'

const { api, config } = getChain()

let lastStateTimestamp: number | undefined

async function getLastChainState(store: Store) {
  return await store.get(ChainState, {
    where: {},
    order: {
      timestamp: 'DESC'
    }
  })
}

export async function processBalances(ctx: Context): Promise<void> {
  const accountIds = new Set<string>()

  if (lastStateTimestamp == null) {
    lastStateTimestamp =
      (await getLastChainState(ctx.store))?.timestamp.getTime() || 0
  }

  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.kind === 'call') {
        const id = processBalancesCallItem(ctx, item)
        if (id) accountIds.add(id)
      } else if (item.kind === 'event') {
        processBalancesEventItem(ctx, item).forEach((id) => accountIds.add(id))
      }
    }

    if (!isOneDay(lastStateTimestamp, block.header.timestamp)) {
      await saveAccounts(ctx, block.header, [...accountIds])
      await saveChainState(ctx, block.header)

      lastStateTimestamp = block.header.timestamp
      accountIds.clear()
    }
  }
  const block = ctx.blocks[ctx.blocks.length - 1]

  await saveAccounts(ctx, block.header, [...accountIds])
}

async function saveAccounts(
  ctx: Context,
  block: SubstrateBlock,
  accountIds: string[]
) {
  const balances = await getBalances(ctx, block, accountIds)
  if (!balances) {
    ctx.log.warn('No balances')
    return
  }

  const accounts = new Map<string, Account>()
  const deletions = new Map<string, Account>()

  for (let i = 0; i < accountIds.length; i++) {
    const id = accountIds[i]
    const balance = balances[i]

    if (!balance) continue
    const total = balance.free + balance.reserved
    if (total > 0n) {
      accounts.set(
        id,
        new Account({
          id,
          free: balance.free,
          reserved: balance.reserved,
          total,
          updatedAt: block.height
        })
      )
    } else {
      deletions.set(id, new Account({ id }))
    }
  }

  await ctx.store.save([...accounts.values()])
  ctx.log.child('accounts').info(`updated: ${accounts.size}`)
}

function processBalancesCallItem(ctx: Context, item: CallItem) {
  const id = getOriginAccountId(item.call.origin)
  return id ? encodeId(id, config.prefix) : undefined
}

function processBalancesEventItem(ctx: Context, item: any) {
  const ids: Uint8Array[] = []
  const { name } = item.event

  if (BALANCE_CONFIG.balanceItems.includes(name))
    try {
      if (name == 'Balances.BalanceSet') {
        const account = api.events.getBalanceSetAccount(ctx, item.event)
        ids.push(account)
      } else if (name == 'Balances.BalanceSet') {
        const account = api.events.getBalanceSetAccount(ctx, item.event)
        ids.push(account)
      } else if (name == 'Balances.Endowed') {
        const account = api.events.getEndowedAccount(ctx, item.event)
        ids.push(account)
      } else if (name == 'Balances.Deposit') {
        const account = api.events.getDepositAccount(ctx, item.event)
        ids.push(account)
      } else if (name == 'Balances.Reserved') {
        const account = api.events.getReservedAccount(ctx, item.event)
        ids.push(account)
      } else if (name == 'Balances.Unreserved') {
        const account = api.events.getUnreservedAccount(ctx, item.event)
        ids.push(account)
      } else if (name == 'Balances.Withdraw') {
        const account = api.events.getWithdrawAccount(ctx, item.event)
        ids.push(account)
      } else if (name == 'Balances.Slashed') {
        const account = api.events.getSlashedAccount(ctx, item.event)
        ids.push(account)
      } else if (name == 'Balances.Transfer') {
        const accounts = api.events.getTransferAccounts(ctx, item.event)
        ids.push(accounts[0])
        ids.push(accounts[0])
      } else {
        const accounts = api.events.getReserveRepatriatedAccounts(
          ctx,
          item.event
        )
        ids.push(...accounts)
      }
    } catch (e) {
      ctx.log.warn('Balnce Event cannot be process.')
      console.dir(e, { depth: null })
    }
  return ids.map((id) => encodeId(id, config.prefix))
}

interface Balance {
  free: bigint
  reserved: bigint
}

async function getBalances(
  ctx: BatchContext<unknown, unknown>,
  block: SubstrateBlock,
  accountIds: string[]
): Promise<(Balance | undefined)[] | undefined> {
  const accountIdsU8 = [...accountIds].map((id) => decodeId(id, config.prefix))
  return (
    (await api.storage.getSystemAccountBalances(ctx, block, accountIdsU8)) ||
    (await api.storage.getBalancesAccountBalances(ctx, block, accountIdsU8))
  )
}
