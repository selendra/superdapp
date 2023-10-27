import { Action } from './base'
import { ProcessorContext } from '../processor'
import { CodeHashChange, ContractCode, ContractEvent } from '../model'
import { StorageInfo, Contract, Account } from '../model'
import { SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { encodeAddress, getBalances } from '../utils'

interface ContractHash {
  codeHash: string
}

export class RemoveContract extends Action<ContractHash> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const contractCodeEntity = await ctx.store.get(ContractCode, {
      where: { id: this.data.codeHash },
      relations: {
        owner: true
      }
    })
    if (contractCodeEntity == null) return

    contractCodeEntity.removedAt = new Date(this.block.timestamp)
    contractCodeEntity.removedExtrinsicHash = this.extrinsic?.hash
      ? this.extrinsic.hash
      : '0x'

    await ctx.store.save(contractCodeEntity)
  }
}

interface ContractData {
  contractInfo: any
  deployer: string
  contract: string
}

export class CreateContract extends Action<ContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const contract = await ctx.store.get(Contract, {
      where: { id: this.data.contract }
    })

    if (contract != null) return

    const contractAccount = await ctx.store.get(Account, {
      where: { id: this.data.contract }
    })

    if (contractAccount == null) return

    const deployerAccount = await ctx.store.get(Account, {
      where: { id: this.data.deployer }
    })

    if (deployerAccount == null) return
    
    let contractCodeEntity = await ctx.store.get(ContractCode, {
      where: { id: toHex(this.data.contractInfo.codeHash) }
    })

    if (contractCodeEntity == null) {
      contractCodeEntity = new ContractCode({
        id: this.data.contractInfo.codeHash,
        owner: deployerAccount,
        createdExtrinsicHash: this.extrinsic?.hash ? this.extrinsic.hash : '0x',
        createdAt: new Date(this.block.timestamp)
      })
    }

    const storageInfo = new StorageInfo({
      storageBaseDeposit: this.data.contractInfo.storageBaseDeposit,
      storageByteDeposit: this.data.contractInfo.storageByteDeposit,
      storageBytes: this.data.contractInfo.storageBytes,
      storageItemDeposit: this.data.contractInfo.storageItemDeposit,
      storageItems: this.data.contractInfo.storageItems
    })

    const contractEntity = new Contract({
      id: this.data.contract,
      trieId: this.data.contractInfo.trieId,
      contractAccount: contractAccount,
      contractCode: contractCodeEntity,
      storageInfo
    })

    await ctx.store.save(contractCodeEntity)
    await ctx.store.save(contractEntity)
  }
}

interface TerminatedContractData {
  beneficiary: string
  contract: string
}

export class TerminatedContract extends Action<TerminatedContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const contractCodeEntity = await ctx.store.get(Contract, {
      where: { id: this.data.contract },
      relations: {
        contractCode: true
      }
    })
    if (contractCodeEntity == null) return

    await this.updateBalance(ctx, this.data.contract)
    const beneficiary = await this.updateBalance(ctx, this.data.beneficiary)

    contractCodeEntity.terminatedAt = new Date(this.block.timestamp)
    contractCodeEntity.terminatedExtrinsicHash = this.extrinsic?.hash
      ? this.extrinsic.hash
      : '0x'
    contractCodeEntity.terminationBeneficiary = beneficiary

    await ctx.store.save(contractCodeEntity)
  }

  private async updateBalance(ctx: ProcessorContext, address: string) {
    const account = await ctx.store.get(Account, {
      where: { id: address }
    })
    if (account == null) return

    const contractBalance = await getBalances(
      ctx,
      this.block,
      this.data.contract
    )

    const freeBalance = contractBalance ? contractBalance.free : BigInt(0)
    const reservedBalance = contractBalance
      ? contractBalance.reserved
      : BigInt(0)

    account.freeBalance = freeBalance
    account.reservedBalance = reservedBalance
    account.totalBalance = freeBalance + reservedBalance

    await ctx.store.save(account)

    return account
  }
}

interface ContractCodeStored {
  codeHash: string
  owner: string
}

export class CodeStoredContract extends Action<ContractCodeStored> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const ownerAccount = await ctx.store.get(Account, {
      where: { id: this.data.owner }
    })

    if (ownerAccount == null) return

    let contractCodeEntity = await ctx.store.get(ContractCode, {
      where: { id: this.data.codeHash }
    })

    if (contractCodeEntity == null) {
      contractCodeEntity = new ContractCode({
        id: this.data.codeHash,
        owner: ownerAccount,
        createdExtrinsicHash: this.extrinsic?.hash ? this.extrinsic.hash : '0x',
        createdAt: new Date(this.block.timestamp)
      })
    }

    await ctx.store.save(contractCodeEntity)
  }
}

interface ContractEmitted {
  id: string
  contract: string
  data: Uint8Array
  indexInBlock: number
}

export class ContractEmittedContract extends Action<ContractEmitted> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const contractEventEntity = new ContractEvent({
      id: this.data.id,
      blockNumber: this.block.height,
      indexInBlock: this.data.indexInBlock,
      contractAddress: this.data.contract,
      data: this.data.data,
      createdAt: new Date(this.block.timestamp),
      extrinsicHash: this.extrinsic?.hash
    })
    await ctx.store.save(contractEventEntity)
  }
}

interface ContractUpdate {
  id: string
  contract: string
  newCodeHash: string
  oldCodeHash: string
  owner: string
}

export class UpdateContract extends Action<ContractUpdate> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {

    const contractEntity = await ctx.store.get(Contract, {
      where: { id: this.data.contract },
    })

    if (contractEntity === undefined) return

    const ownerAccount = await ctx.store.get(Account, {
      where: { id: this.data.owner }
    })

    if (ownerAccount == null) return

    let contractCodeEntity = await ctx.store.get(ContractCode, {
      where: { id: this.data.newCodeHash }
    })

    if (contractCodeEntity == null) {
      contractCodeEntity = new ContractCode({
        id: this.data.newCodeHash,
        owner: ownerAccount,
        createdExtrinsicHash: this.extrinsic?.hash ? this.extrinsic.hash : '0x',
        createdAt: new Date(this.block.timestamp)
      })
    }

    contractEntity.contractCode = contractCodeEntity

    const codeHashChangeEntity = new CodeHashChange({
      id: this.data.id,
      contract: contractEntity,
      newCodeHash: this.data.newCodeHash,
      oldCodeHash: this.data.oldCodeHash,
      changedAt: new Date(this.block.timestamp),
      extrinsicHash: this.extrinsic?.hash
    })

    await ctx.store.save(contractCodeEntity)
    await ctx.store.save(contractEntity)
    await ctx.store.save(codeHashChangeEntity)
    
  }
}
