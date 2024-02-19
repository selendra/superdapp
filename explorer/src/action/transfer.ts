import { chain } from "../chain";
import { Account, TokenTransfer, Transfer, TransferDirection, Extrinsic, TransferType } from "../model";
import { ProcessorContext } from "../processor";
import { Action } from "./base";

export interface TransferData {
  id: string
  fromId: string
  toId: string
  amount: bigint
  success: boolean
}

export class TransferAction extends Action<TransferData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    let from = await ctx.store.findOneOrFail(Account, {
      where: { id: this.data.fromId },
    });

    let to = await ctx.store.findOneOrFail(Account, {
      where: { id: this.data.toId },
    });

    let transfer = new TokenTransfer({
      id: this.data.id,
      blockNumber: this.block.height,
      timestamp: new Date(this.block.timestamp),
      extrinsicHash: this.extrinsic?.hash ? this.extrinsic.hash : '0x',
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
      name: chain.config.chainName,
      symbol: chain.config.symbols,
      direction: TransferDirection.From,

    });

    let transferTo = new Transfer({
      id: transfer.id + "-to",
      transfer,
      account: to,
      name: chain.config.chainName,
      symbol: chain.config.symbols,
      direction: TransferDirection.To,
    });
    await ctx.store.insert([transferFrom, transferTo]);
  }
}
