import { Action } from './base'
import { ProcessorContext } from '../processor'
import { ContractCode } from '../model'
import { ContractInfo } from '../chain/selendra/types/v10000'
import { StorageInfo, Contract, Account } from '../model'
import { SubstrateBlock, toHex } from '@subsquid/substrate-processor'

interface ContractHash {
  codeHash: string
}

export class RemoveContract extends Action<ContractHash> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const contractCodeEntity = await ctx.store.get(ContractCode, {
      where: { id: this.data.codeHash },
      relations: {
        owner: true,
      }
    })

    if (contractCodeEntity == null) return
  }
}

interface ContractData {
  contractInfo: ContractInfo
  deployer: string
  contract: string
}

export class CreateContract extends Action<ContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const contract = await ctx.store.get(Contract, {
      where: { id: this.data.contract }
    })

    if(contract != null) return

    const contractAccount = await ctx.store.get(Account, {
      where: { id: this.data.contract }
    })

    if(contractAccount == null) return

    const deployerAccount = await ctx.store.get(Account, {
      where: { id: this.data.deployer }
    })

    if(deployerAccount == null) return

    const storageInfo = new StorageInfo({
      storageBaseDeposit: this.data.contractInfo.storageBaseDeposit,
      storageByteDeposit: this.data.contractInfo.storageByteDeposit,
      storageBytes: this.data.contractInfo.storageBytes,
      storageItemDeposit: this.data.contractInfo.storageItemDeposit,
      storageItems: this.data.contractInfo.storageItems
    })

    const contractCodeEntity = new ContractCode({
      id: toHex(this.data.contractInfo.codeHash),
      owner: deployerAccount,
      createdFrom: this.extrinsic?.hash ? this.extrinsic.hash : '0x',
      createdAt: new Date(this.block.timestamp),
    })

    const contractEntity = new Contract({
      id: this.data.contract,
      trieId:  this.data.contractInfo.trieId,
      contractAccount: contractAccount,
      contractCode: contractCodeEntity,
      storageInfo,
    })


    await ctx.store.save(contractCodeEntity)
    await ctx.store.save(contractEntity)
  }
}
