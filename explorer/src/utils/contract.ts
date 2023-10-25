import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Account, ContractCode } from "../model";

export async function createContractCodeEntities({
    block,
    codeHash,
    extrinsicHash,
    codeOwnerEntity
  }: {
    block: SubstrateBlock
    codeHash: string,
    extrinsicHash: string
    codeOwnerEntity: Account
  }): Promise<{ contractCodeEntity: ContractCode }> {
  
    const contractCodeEntity = new ContractCode({
      id: codeHash,
      owner: codeOwnerEntity,
      createdExtrinsicHash: extrinsicHash,
      createdAt: new Date(block.timestamp),
    })
  
    return { contractCodeEntity }
  }