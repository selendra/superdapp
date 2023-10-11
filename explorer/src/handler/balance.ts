import { TypeormDatabase } from "@subsquid/typeorm-store";
import { processor } from "../processor";
import { encodeAddress,  } from "../utils";
import { chain } from "../chain";
import { Account } from "../model";
import { Action } from "../action/base";
import { EnsureAccount, TransferAction } from "../action";


processor.run(new TypeormDatabase(), async (ctx) => {
  const actions: Action[] = [];

  for (const { items, header } of ctx.blocks) {
    for (const item of items as any) {
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
            // new TransferAction(header, item.event.extrinsic, {
            //   id: item.event.id,
            //   fromId,
            //   toId,
            //   amount: data.amount,
            //   success: true,
            // })
          );
          break;
        }
      }
    }
  }

  await Action.process(ctx, actions);
});


