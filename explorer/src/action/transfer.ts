import { chain } from "../chain";
import { Account, Transfer, Extrinsic, TransferType } from "../model";
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

    let transfer = new Transfer({
      id: this.data.id,
      blockNumber: this.block.height,
      timestamp: new Date(this.block.timestamp),
      extrinsicHash: this.extrinsic?.hash ? this.extrinsic.hash : '0x',
      amount: this.data.amount,
      success: this.data.success,
      type: TransferType.Native,
      from, to,
      name: chain.config.chainName,
      symbol: chain.config.symbols,
    });

    await ctx.store.insert(transfer);
  }
}
