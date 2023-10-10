import { TypeormDatabase } from "@subsquid/typeorm-store";
import { processor } from "./processor";
import { StoreWithCache } from "@belopash/squid-tools";
import { encodeAddress, getOriginAccountId } from "./utils";
import { chain } from "./chain";
import { Account, Identity, Judgement, IdentitySub } from "./model";
import { Action, LazyAction } from "./action/base";
import assert from "assert";
import { EnsureAccount, TransferAction, RewardAction } from "./action";
import {
  AddIdentitySubAction,
  ClearIdentityAction,
  EnsureIdentityAction,
  EnsureIdentitySubAction,
  GiveJudgementAction,
  KillIdentityAction,
  RemoveIdentitySubAction,
  RenameSubAction,
  SetIdentityAction,
} from "./action/identity";
import { toHex } from "@subsquid/substrate-processor";

processor.run(new TypeormDatabase(), async (ctx) => {
  const actions: Action[] = [];

  for (const { items, header } of ctx.blocks) {
    for (const item of items) {
      switch (item.name) {
        case "Balances.Transfer": {
          const data = chain.api.events.balances.Transfer.decode(
            ctx,
            item.event
          );

          const fromId = encodeAddress(data.from);
          const from = ctx.store.get(Account, {
            where: { id: fromId },
          });

          const toId = encodeAddress(data.to);
          const to = ctx.store.get(Account, { where: { id: toId } });

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              account: () => from,
              id: fromId,
            }),
            new EnsureAccount(header, item.event.extrinsic, {
              account: () => to,
              id: toId,
            }),
            new TransferAction(header, item.event.extrinsic, {
              id: item.event.id,
              fromId,
              toId,
              amount: data.amount,
              success: true,
            })
          );
          break;
        }
      }
    }
  }

  await Action.process(ctx, actions);
});


