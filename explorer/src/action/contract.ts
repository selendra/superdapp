import { Action } from './base'
import { ProcessorContext } from '../processor'
import {
  ActivityType,
  CodeHashChange,
  ContractActivity,
  ContractCode,
  ContractEvent,
  DecodedActivityArg,
  DecodedContractActivity,
  DecodedContractEvent,
  DecodedEventArg
} from '../model'
import { StorageInfo, Contract, Account } from '../model'
import {
  SubstrateBlock,
  SubstrateExtrinsicSignature,
  toHex
} from '@subsquid/substrate-processor'
import {
  createActivity,
  decodeData,
  encodeAddress,
  getBalances,
  saveAll
} from '../utils'
import { chain } from '../chain'
import { DecodedElement } from '../abi/wasmDecoder/types'
import { Entity } from '@subsquid/typeorm-store'
import abiDecoder from '../abi/wasmDecoder/decoder'

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
  id: string
}

export class CodeStoredContract extends Action<ContractCodeStored> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const entities: OptEntity[] = [];

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

    const activityEntity = createActivity(
      this.extrinsic.hash,
      this.data.id,
      ActivityType.CODESTORED,
      undefined,
      new Date(this.block.timestamp),
      ownerAccount,
    );

    entities.push(activityEntity, contractCodeEntity)

    await saveAll(ctx.store, entities);
  }
}

interface ContractEmitted {
  id: string
  contract: string
  data: Uint8Array
  codeHash: Uint8Array
  indexInBlock: number
}

export class ContractEmittedContract extends Action<ContractEmitted> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const entities: OptEntity[] = []

    const contractEventEntity = new ContractEvent({
      id: this.data.id,
      blockNumber: this.block.height,
      indexInBlock: this.data.indexInBlock,
      contractAddress: this.data.contract,
      data: this.data.data,
      createdAt: new Date(this.block.timestamp),
      extrinsicHash: this.extrinsic?.hash
    })
    entities.push(contractEventEntity)

    // Decode data with ABI
    await decodeData(
      this.data.data,
      async (rawData: string | Uint8Array | Buffer) => {
  
        const decodedElement = await abiDecoder.decodeEvent({
          codeHash: toHex(this.data.codeHash),
          data: rawData
        })

        this.addDecodedEventEntities({
          entities,
          decodedElement,
          contractEventEntity
        })
      }
    )

    await saveAll(ctx.store, entities)
  }

  private addDecodedEventEntities({
    entities,
    decodedElement,
    contractEventEntity
  }: {
    entities: OptEntity[]
    decodedElement?: DecodedElement
    contractEventEntity: ContractEvent
  }): void {
    if (decodedElement) {
      const decodedEventEntity = new DecodedContractEvent({
        id: contractEventEntity.id,
        name: decodedElement.name,
        contractEvent: contractEventEntity
      })

      entities.push(decodedEventEntity)

      for (const arg of decodedElement.args) {
        entities.push(
          new DecodedEventArg({
            id: `${decodedEventEntity.id}-${arg.name}`,
            decodedEvent: decodedEventEntity,
            ...arg
          })
        )
      }
    }
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
      where: { id: this.data.contract }
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

export type OptEntity = Entity | undefined

interface ContractCall {
  contractAddress: string
  data: Uint8Array
  id: string
  from: string
}

export class CallContract extends Action<ContractCall> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const entities: OptEntity[] = []

    const contractAccount = await ctx.store.get(Account, {
      where: { id: this.data.contractAddress }
    })

    const signerAccount = await ctx.store.get(Account, {
      where: { id: this.data.from }
    })

    if (contractAccount == null) return
    if (signerAccount == null) return

    const activityEntity = createActivity(
      this.extrinsic.hash,
      this.data.id,
      ActivityType.CONTRACTCALL,
      contractAccount,
      new Date(this.block.timestamp),
      signerAccount
    )

    entities.push(activityEntity)

    // Decode data with ABI
    await decodeData(
      this.data.data,
      async (rawData: string | Uint8Array | Buffer) => {
        const codeHash = await this.getCodeHashForContract(
          ctx,
          this.block,
          this.data.contractAddress
        )

        if (codeHash) {
          const decodedElement = await abiDecoder.decodeMessage({
            codeHash,
            data: rawData
          })

          this.addDecodedActivityEntities({
            entities,
            decodedElement,
            activityEntity
          })
        }
      }
    )

    await saveAll(ctx.store, entities)
  }

  private async getCodeHashForContract(
    ctx: ProcessorContext,
    block: SubstrateBlock,
    contractAddress: string
  ) {
    const { store, log } = ctx
    let resolvedCodeHash

    try {
      const { codeHash } =
        await chain.api.storages.contract.getContractInfoOfStorage.decode(
          ctx,
          block,
          contractAddress
        )
      resolvedCodeHash = toHex(codeHash)
    } catch (error) {
      log.error(
        { error: <Error>error },
        'Error while trying to retrive codeHash in Contracts.Call extrinsic'
      )
      const contractCodeEntity = await store.get(ContractCode, {
        where: {
          contractsDeployed: {
            id: contractAddress
          }
        }
      })
      if (contractCodeEntity) {
        resolvedCodeHash = contractCodeEntity.id
      }
    }
    return resolvedCodeHash
  }

  private addDecodedActivityEntities({
    entities,
    decodedElement,
    activityEntity
  }: {
    entities: OptEntity[]
    decodedElement?: DecodedElement
    activityEntity: ContractActivity
  }): void {
    if (decodedElement) {
      const decodedElementEntity = new DecodedContractActivity({
        id: activityEntity.id,
        name: decodedElement.name,
        activity: activityEntity
      })

      entities.push(decodedElementEntity)

      for (const arg of decodedElement.args) {
        entities.push(
          new DecodedActivityArg({
            id: `${decodedElementEntity.id}-${arg.name}`,
            decodedActivity: decodedElementEntity,
            ...arg
          })
        )
      }
    }
  }
}
