import { SubstrateBlock } from '@subsquid/substrate-processor'
import { api } from '../../chains'
import {
  Ctx,
  Event,
  EventHandler,
  EventHandlerParams
} from '../../interfaces/handler'

import {
  createEvent,
  createExtrinsic,
  saveAll,
  updateAccountBalance
} from '../../utils'

export const balancesTransferHandler: EventHandler = {
  name: 'Balances.Transfer',
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { from, to } = new api.events.NormalisedBalancesTransferEvent(
      ctx,
      event
    ).resolve()
    await updateEntities({ ctx, event, block, accounts: [from, to] })
  }
}

export const balancesWithdrawHandler: EventHandler = {
  name: 'Balances.Withdraw',
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { account } = new api.events.NormalisedBalancesWithdrawEvent(
      ctx,
      event
    ).resolve()
    await updateEntities({ ctx, event, block, accounts: [account] })
  }
}

export const balancesReservedHandler: EventHandler = {
  name: 'Balances.Reserved',
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { account } = new api.events.NormalisedBalancesReservedEvent(
      ctx,
      event
    ).resolve()
    await updateEntities({ ctx, event, block, accounts: [account] })
  }
}

export const balancesEndowedHandler: EventHandler = {
  name: 'Balances.Endowed',
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { account } = new api.events.NormalisedBalancesEndowedEvent(
      ctx,
      event
    ).resolve()
    await updateEntities({ ctx, event, block, accounts: [account] })
  }
}

export const balancesSetHandler: EventHandler = {
  name: 'Balances.BalanceSet',
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { account } = new api.events.NormalisedBalancesSetEvent(
      ctx,
      event
    ).resolve()
    await updateEntities({ ctx, event, block, accounts: [account] })
  }
}

export const balancesDepositHandler: EventHandler = {
  name: 'Balances.Deposit',
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { account } = new api.events.NormalisedBalancesDepositEvent(
      ctx,
      event
    ).resolve()

    console.log(account)
    await updateEntities({ ctx, event, block, accounts: [account] })
  }
}

export const balancesReserveRepatriatedHandler: EventHandler = {
  name: 'Balances.ReserveRepatriated',
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { from, to } = new api.events.NormalisedReserveRepatriatedEvent(
      ctx,
      event
    ).resolve()
    await updateEntities({ ctx, event, block, accounts: [from, to] })
  }
}

export const balancesSlashedHandler: EventHandler = {
  name: 'Balances.Unreserved',
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { account } = new api.events.NormalisedBalancesUnreservedEvent(
      ctx,
      event
    ).resolve()
    await updateEntities({ ctx, event, block, accounts: [account] })
  }
}

async function updateEntities({
  ctx,
  event,
  block,
  accounts
}: EventHandlerParams & { accounts: string[] }): Promise<void> {
  const { store } = ctx
  const { extrinsic, call } = event
  for (const account of accounts) {
    const accountEntity = await updateAccountBalance(ctx, account, block)
    await store.save(accountEntity)
  }
  if (extrinsic && call) {
    const extrinsicEntity = createExtrinsic(extrinsic, call, block)
    const eventEntity = createEvent(extrinsicEntity, event)
    await saveAll(store, [extrinsicEntity, eventEntity])
  }
}
