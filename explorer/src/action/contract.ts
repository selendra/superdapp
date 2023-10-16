import { SubstrateBlock } from '@subsquid/substrate-processor'
import { checkAddress, addressToEvm } from '@polkadot/util-crypto'
import { u8aToHex } from '@polkadot/util'
import { Account, EvmContract, Extrinsic } from '../model'
import { CONTRACT_METHODS, ContractType, decodeAddress } from '../utils'
import { Action } from './base'
import { ProcessorContext } from '../processor'
import { chain } from '../chain'
import { ContractData } from '../interface'
import { ethers } from 'ethers'

const CONTRACT_CREATION_IDENTIFIER = '608060';

export class EnsureEvmContract extends Action<ContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const contractId = await this.data.item.event.args.to

    let contract = await ctx.store.get(EvmContract, {
      where: { id: contractId },
    });
    if(contract != null) return

    const bytecode = await this.data.item.event.call.args.transaction.value.input
    if (!this.isContractCreationInput(bytecode)) return

    const signer = await this.data.item.event.args.from
    let account =  await ctx.store.get(Account, {
      where: { id: signer },
    });
    
    const contratcType = this.getContractTypeFromRaw(bytecode)
    const {context, args}  = this.preprocessBytecode(bytecode)
   
     contract = new EvmContract({
      id: contractId,
      extrinsicHash: this.extrinsic?.hash ? this.extrinsic.hash: '0x',
      signer: account,
      bytecode,
      bytecodeContext: context,
      bytecodeArguments: args,
      timestamp: this.block.height,
      type: contratcType
    })

    await ctx.store.save(contract)
  }

  private preprocessBytecode(bytecode: string) {
    const start = bytecode.indexOf('6080604052');
    const end = bytecode.indexOf('a265627a7a72315820') !== -1
        ? bytecode.indexOf('a265627a7a72315820')
        : bytecode.indexOf('a264697066735822');
    return {
        context: bytecode.slice(start, end),
        args: bytecode.slice(end),
    };
  }

  private isContractCreationInput(bytecode: string) {
    return bytecode.includes(CONTRACT_CREATION_IDENTIFIER);
  }

  private getContractTypeFromRaw(txInput: string): ContractType {
    const found = Object.entries(CONTRACT_METHODS).find(([_, methods]) => {
      return methods.every((signature) => {
        const methodId = ethers
          .keccak256(Buffer.from(signature))
          .substring(2, 10);
        return txInput.includes(methodId);
      });
    });
  
    if (!found) {
      return 'unknown';
    }
  
    return found[0] as ContractType;
  }
}

