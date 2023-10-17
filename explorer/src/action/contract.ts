import { Account, EvmContract } from '../model'
import { CONTRACT_METHODS, ContractType } from '../utils'
import { Action } from './base'
import { ProcessorContext } from '../processor'
import { ethers } from 'ethers'

const CONTRACT_CREATION_IDENTIFIER = '608060'

export interface ContractData {
  item: any
}

interface Opcode {
  pc: number;
  pushData?: Buffer;
  name: string;
  opcode: number;
  fee: number;
  in: number;
  out: number;
  dynamic: boolean;
  async: boolean;
}

interface Item {
  hash: string;
  name?: string;
}

export class EnsureEvmContract extends Action<ContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const contractId = this.data.item.event.args.to
    const signer = this.data.item.event.args.from

    let contract = await ctx.store.get(EvmContract, {
      where: { id: contractId }
    })

    if (contract != null) return

    const bytecode = this.data.item.event.call.args.transaction.value
      .input
    if (!this.isContractCreationInput(bytecode)) return

    const contratcType = this.getContractTypeFromRaw(bytecode)
    const { context, args } = this.preprocessBytecode(bytecode)

    contract = new EvmContract({
      id: contractId,
      extrinsicHash: this.extrinsic?.hash ? this.extrinsic.hash : '0x',
      account: signer,
      bytecode,
      bytecodeContext: context,
      bytecodeArguments: args,
      timestamp: this.block.height,
      type: contratcType
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

    if (!found) {
      return 'unknown'
    }

    return found[0] as ContractType
  }
}


export class evmContractTransfer extends Action<ContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    console.log(this.data.item)
  }
}