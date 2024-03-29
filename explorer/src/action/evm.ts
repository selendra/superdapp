import { ethers } from 'ethers'
import { evmToAddress } from '@polkadot/util-crypto'
import {
  Account,
  EvmContract,
  Transfer,
  TransferType
} from '../model'
import { CONTRACT_METHODS, ContractType, getTokenDetails } from '../utils'
import { Action } from './base'
import { ProcessorContext } from '../processor'
import * as erc20 from '../abi/erc20'
import { chain } from '../chain'

const CONTRACT_CREATION_IDENTIFIER = '608060'

export interface ContractData {
  item: any
}

export class EnsureEvmContract extends Action<ContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const contractId = this.data.item.event.args.to
    const signer = this.data.item.event.args.from

    let contract = await ctx.store.get(EvmContract, {
      where: { id: contractId }
    })

    if (contract != null) return

    const bytecode = this.data.item.event.call.args.transaction.value.input
    if (!this.isContractCreationInput(bytecode)) return

    const contractType = this.getContractTypeFromRaw(bytecode)
    const { context, args } = this.preprocessBytecode(bytecode)
    const { name, symbol } = await getTokenDetails({
      contractAddress: contractId,
      contractStandard: contractType,
      block: this.block.height,
      ctx,
    })
    contract = new EvmContract({
      id: contractId,
      extrinsicHash: this.extrinsic?.hash ? this.extrinsic.hash : '0x',
      account: signer,
      name,
      symbol,
      bytecode,
      bytecodeContext: context,
      bytecodeArguments: args,
      timestamp: this.block.height,
      type: (contractType == 'bare' || contractType == 'basic') ? 'unknown' : contractType
    })

    await ctx.store.save(contract)
  }

  private preprocessBytecode(bytecode: string) {
    const start = bytecode.indexOf('6080604052')
    const end =
      bytecode.indexOf('a265627a7a72315820') !== -1
        ? bytecode.indexOf('a265627a7a72315820')
        : bytecode.indexOf('a264697066735822')
    return {
      context: bytecode.slice(start, end),
      args: bytecode.slice(end)
    }
  }

  private isContractCreationInput(bytecode: string) {
    return bytecode.includes(CONTRACT_CREATION_IDENTIFIER)
  }

  private getContractTypeFromRaw(txInput: string): ContractType {
    const found = Object.entries(CONTRACT_METHODS).find(([_, methods]) => {
      return methods.every((signature) => {
        const methodId = ethers
          .keccak256(Buffer.from(signature))
          .substring(2, 10)
        return txInput.includes(methodId)
      })
    })

    return found ? found[0] as ContractType : (
      txInput.includes("06fdde03") ?
        (txInput.includes("95d89b41") ? 'basic' : 'bare') : 'unknown'
    )
  }
}

export class evmContractErc20 extends Action<ContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    try {
      const {
        from,
        to,
        value: amount
      } = erc20.events.Transfer.decode(this.data.item.event.args.log)
      const address: string = this.data.item.event.args.log.address
      const { name, symbol } = await getTokenDetails({
        contractAddress: address,
        contractStandard: 'ERC20',
        ctx,
        block: this.block.height
      })

      const fromAccount = await this.exitOrNot(ctx, from)
      const toAccount = await this.exitOrNot(ctx, to)
      let transfer = new Transfer({
        id: this.data.item.event.evmTxHash,
        blockNumber: this.block.height,
        timestamp: new Date(this.block.timestamp),
        extrinsicHash: this.extrinsic?.hash ? this.extrinsic.hash : '0x',
        from: fromAccount,
        to: toAccount,
        amount: amount,
        success: this.data.item.event.call.success,
        type: TransferType.ERC20,
        name,
        symbol,
        contract: address,
      })

      await ctx.store.insert(transfer)
    } catch (error) {
      console.log(error)
      return
    }
  }

  private async exitOrNot(ctx: ProcessorContext, address: string) {
    const substrateAddress = this.getSubstrateAddress(address)

    let account = await ctx.store.get(Account, {
      where: { id: substrateAddress }
    })

    if (account == null) {
      account = new Account({
        id: substrateAddress,
        freeBalance: BigInt(0),
        reservedBalance: BigInt(0),
        totalBalance: BigInt(0),
        updatedAt: this.block.height,
        evmAddress: address
      })
      await ctx.store.save(account)
    }

    return account
  }

  private getSubstrateAddress(id: string) {
    return evmToAddress(id, chain.config.prefix)
  }
}
