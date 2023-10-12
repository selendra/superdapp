import { chain } from "../chain";
import { Account, TokenTransfer, Transfer, TransferDirection, Extrinsic, TransferType } from "../model";
import { ProcessorContext } from "../processor";
import { Action } from "./base";
import { TransferData } from '../interface'

export class TransferAction extends Action<TransferData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    let from = await ctx.store.findOneOrFail(Account, {
      where: { id: this.data.fromId },
    });

    let to = await ctx.store.findOneOrFail(Account, {
      where: { id: this.data.toId },
    });

    let extrinsic = await ctx.store.findOneOrFail(Extrinsic, {
        where: { extrinsicHash: this.extrinsic?.hash },
      })

    let transfer = new TokenTransfer({
      id: this.data.id,
      blockNumber: this.block.height,
      timestamp: new Date(this.block.timestamp),
      extrinsic: extrinsic,
      from,
      to,
      amount: this.data.amount,
      success: this.data.success,
      type: TransferType.Native
    });

    await ctx.store.insert(transfer);

    let transferFrom = new Transfer({
      id: transfer.id + "-from",
      transfer,
      account: from,
      denom: chain.config.symbols,
      direction: TransferDirection.From,
      
    });

    let transferTo = new Transfer({
      id: transfer.id + "-to",
      transfer,
      account: to,
      denom: chain.config.symbols,
      direction: TransferDirection.To,
    });
    await ctx.store.insert([transferFrom, transferTo]);
  }
}
