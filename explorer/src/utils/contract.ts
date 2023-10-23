import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Account, ContractCode } from "../model";
import { chain } from '../chain'
import { ProcessorContext } from '../processor'

export async function createContractCodeEntities({
    ctx,
    block,
    codeHash,
    extrinsicHash,
    codeOwnerEntity
  }: {
    ctx: ProcessorContext
    block: SubstrateBlock
    codeHash: string,
    extrinsicHash: string
    codeOwnerEntity: Account
  }): Promise<{ contractCodeEntity: ContractCode }> {
  
    const contractCodeEntity = new ContractCode({
      id: codeHash,
      owner: codeOwnerEntity,
      createdFrom: extrinsicHash,
      createdAt: new Date(block.timestamp),
    })
  
    return { contractCodeEntity }
  }