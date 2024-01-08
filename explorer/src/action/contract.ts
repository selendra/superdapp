import { Action } from './base'
import { ProcessorContext } from '../processor'
import {
  ActivityType,
  CodeHashChange,
  ContractCode,
  ContractEvent,
  DecodedContractEvent,
  DecodedEventArg
} from '../model'
import { StorageInfo, Contract, Account } from '../model'
import { SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import {
  ContractCodeStoredArgs,
  ContractCodeUpdatedArgs,
  ContractInstantiatedArgs,
  ExtrinsicArg,
  OptEntity,
  addDecodedActivityEntities,
  createActivity,
  decodeData,
  getBalances,
  saveAll
} from '../utils'
import { chain } from '../chain'
import { DecodedElement } from '../abi/wasmDecoder/types'
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
  id: string
  contractInfo: any
  deployer: string
  contract: string
  args: any
}

export class CreateContract extends Action<ContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const entities: OptEntity[] = []
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

    const args = this.data.args
      ? <ContractInstantiatedArgs>this.data.args
      : null

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
      storageInfo,
    })

    const allArgs: ContractInstantiatedArgs = args || {}
    if (allArgs.codeHash === undefined) {
      allArgs.codeHash = toHex(this.data.contractInfo.codeHash)
    }

    const activityEntity = createActivity(
      this.extrinsic.hash,
      this.data.id,
      ActivityType.CONTRACT,
      contractAccount,
      new Date(this.block.timestamp),
      deployerAccount,
      allArgs
    )

    entities.push(contractEntity, activityEntity)

    const { data } = <ExtrinsicArg>this.data.args

    // Decode data with ABI
    await decodeData(data, async (rawData: string | Uint8Array | Buffer) => {
      const decodedElement = await abiDecoder.decodeConstructor({
        codeHash: toHex(this.data.contractInfo.codeHash),
        data: rawData
      })

      addDecodedActivityEntities({
        entities,
        decodedElement,
        activityEntity
      })
    })
    await saveAll(ctx.store, entities)
  }
}

interface TerminatedContractData {
  id: string
  beneficiary: string
  contract: string
  signer: string
  args: any
}

export class TerminatedContract extends Action<TerminatedContractData> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const entities: OptEntity[] = []

    const contractEntity = await ctx.store.get(Contract, {
      where: { id: this.data.contract },
      relations: {
        contractCode: true
      }
    })
    if (contractEntity == null) return

    const contractAccount = await this.updateBalance(ctx, this.data.contract)
    const beneficiaryAccount = await this.updateBalance(
      ctx,
      this.data.beneficiary
    )
    const signerAccount = await this.updateBalance(ctx, this.data.signer)

    contractEntity.terminatedAt = new Date(this.block.timestamp)
    contractEntity.terminatedExtrinsicHash = this.extrinsic?.hash
      ? this.extrinsic.hash
      : '0x'
    contractEntity.terminationBeneficiary = beneficiaryAccount

    const activityEntity = createActivity(
      this.extrinsic.hash,
      this.data.id,
      ActivityType.CONTRACTTERMINATE,
      contractAccount,
      new Date(this.block.timestamp),
      signerAccount
    )

    entities.push(contractEntity, activityEntity)

    const { data } = <ExtrinsicArg>this.data.args

    // Decode data with ABI
    await decodeData(data, async (rawData: string | Uint8Array | Buffer) => {
      // We get the contract code entity from DB instead of on-chain storage
      // since contract doesn't exist anymore
      const contractCodeEntity = await ctx.store.get(ContractCode, {
        where: {
          contractsDeployed: {
            id: this.data.contract
          }
        }
      })

      if (contractCodeEntity) {
        const decodedElement = await abiDecoder.decodeMessage({
          codeHash: contractCodeEntity.id,
          data: rawData
        })

        addDecodedActivityEntities({
          entities,
          decodedElement,
          activityEntity
        })
      }
    })

    await saveAll(ctx.store, entities)
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
  args: any
}

export class CodeStoredContract extends Action<ContractCodeStored> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const entities: OptEntity[] = []

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

    const args = (this.data.args || {}) as ContractCodeStoredArgs
    args.codeHash = this.data.codeHash

    const activityEntity = createActivity(
      this.extrinsic.hash,
      this.data.id,
      ActivityType.CODESTORED,
      undefined,
      new Date(this.block.timestamp),
      ownerAccount,
      args
    )

    entities.push(activityEntity, contractCodeEntity)

    // Decode data with ABI
    await decodeData(
      args.data,
      async (rawData: string | Uint8Array | Buffer) => {
        const decodedElement = await abiDecoder.decodeConstructor({
          codeHash: this.data.codeHash,
          data: rawData
        })

        addDecodedActivityEntities({
          entities,
          decodedElement,
          activityEntity
        })
      }
    )
    await saveAll(ctx.store, entities)
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
  args: any
  signer: string
}

export class UpdateContract extends Action<ContractUpdate> {
  protected async _perform(ctx: ProcessorContext): Promise<void> {
    const entities: OptEntity[] = []

    const contractEntity = await ctx.store.get(Contract, {
      where: { id: this.data.contract }
    })

    if (contractEntity === undefined) return

    const ownerAccount = await ctx.store.get(Account, {
      where: { id: this.data.owner }
    })

    if (ownerAccount == null) return

    const signer = await ctx.store.get(Account, {
      where: { id: this.data.signer }
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

    const args = (this.data.args || {}) as ContractCodeUpdatedArgs
    args.newCodeHash = this.data.newCodeHash
    args.oldCodeHash = this.data.oldCodeHash

    const activityEntity = createActivity(
      this.extrinsic.hash,
      this.data.id,
      ActivityType.CODEUPDATE,
      contractEntity.contractAccount,
      new Date(this.block.timestamp),
      signer,
      args
    )

    entities.push(
      contractCodeEntity,
      contractEntity,
      codeHashChangeEntity,
      activityEntity
    )

    const { data } = args

    await decodeData(data, async (rawData: string | Uint8Array | Buffer) => {
      const decodedElement = await abiDecoder.decodeMessage({
        codeHash: this.data.newCodeHash,
        data: rawData
      })

      addDecodedActivityEntities({
        entities,
        decodedElement,
        activityEntity
      })
    })

    await saveAll(ctx.store, entities)
  }
}

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

          addDecodedActivityEntities({
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
}
