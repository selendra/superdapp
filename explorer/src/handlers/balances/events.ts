import { SubstrateBlock } from '@subsquid/substrate-processor'

import {
  NormalisedBalancesEndowedEvent,
  NormalisedBalancesReservedEvent,
  NormalisedBalancesTransferEvent,
  NormalisedBalancesWithdrawEvent
} from '../../chains'
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
} from "../../utils";


export const balancesTransferHandler: EventHandler = {
  name: "Balances.Transfer",
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { from, to } = new NormalisedBalancesTransferEvent(
      ctx,
      event
    ).resolve();
    await updateEntities({ ctx, event, block, accounts: [from, to] });
  },
};

async function updateEntities({
  ctx,
  event,
  block,
  accounts,
}: EventHandlerParams & { accounts: string[] }): Promise<void> {
  const { store } = ctx;
  const { extrinsic, call } = event;
  for (const account of accounts) {
    const accountEntity = await updateAccountBalance(ctx, account, block);
    await store.save(accountEntity);
  }
  if (extrinsic && call) {
    const extrinsicEntity = createExtrinsic(extrinsic, call, block);
    const eventEntity = createEvent(extrinsicEntity, event);
    await saveAll(store, [extrinsicEntity, eventEntity]);
  }
}
