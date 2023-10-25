import { chain } from '../chain'
import { Action } from '../action/base'
import {
  RemoveContract,
  EnsureAccount,
  CreateContract,
  TerminatedContract,
  CodeStoredContract,
  ContractEmittedContract,
  UpdateContract
} from '../action'
import { encodeAddress } from '../utils'

export async function process(ctx: any) {
  const actions: Action[] = []

  for (const { items, header } of ctx.blocks) {
    for (const item of items as any) {
      switch (item.name) {
        case 'Contracts.CodeRemoved': {
          const data = chain.api.events.contract.ContractsCodeRemoved.decode(
            ctx,
            item.event
          )
          actions.push(
            new RemoveContract(header, item.event.extrinsic, {
              codeHash: data.codeHash
            })
          )
          break
        }
        case 'Contracts.Instantiated': {
          const data = chain.api.events.contract.ContractsInstantiated.decode(
            ctx,
            item.event
          )

          const contractInfo =
            await chain.api.storages.contract.getContractInfoOfStorage.decode(
              ctx,
              header,
              data.contract
            )

          actions.push(
            new EnsureAccount(header, item.event.extrinsic, {
              id: data.deployer
            }),
            new EnsureAccount(header, item.event.extrinsic, {
              id: data.contract
            }),

            new CreateContract(header, item.event.extrinsic, {
              contractInfo,
              deployer: data.deployer,
              contract: data.contract
            })
          )
          break
        }
        case 'Contracts.Terminated': {
          const data = chain.api.events.contract.ContractTerminated.decode(
            ctx,
            item.event
          )
          actions.push(
            new TerminatedContract(header, item.event.extrinsic, {
              beneficiary: data.beneficiary,
              contract: data.contract
            })
          )
          break
        }
        case 'Contracts.CodeStored': {
          const data = chain.api.events.contract.ContractsCodeStored.decode(
            ctx,
            item.event
          )

          const { owner } =
            await chain.api.storages.contract.getCodeStorageStorage.decode(
              ctx,
              header,
              data.codeHash
            )

          const owneraddress = encodeAddress(owner)

          actions.push(
            new CodeStoredContract(header, item.event.extrinsic, {
              codeHash: data.codeHash,
              owner: owneraddress
            })
          )
          break
        }
        case 'Contracts.ContractEmitted': {
          const { contract, data } =
            chain.api.events.contract.ContractEmitted.decode(ctx, item.event)

          actions.push(
            new ContractEmittedContract(header, item.event.extrinsic, {
              id: item.event.id,
              contract,
              data,
              indexInBlock: item.event.indexInBlock
            })
          )
          break
        }

        case 'Contracts.ContractCodeUpdated': {
          const { contract, newCodeHash, oldCodeHash } =
            chain.api.events.contract.ContractsCodeUpdated.decode(
              ctx,
              item.event
            )

          const { owner } =
            await chain.api.storages.contract.getCodeStorageStorage.decode(
              ctx,
              header,
              newCodeHash
            )

          const owneraddress = encodeAddress(owner)

          actions.push(
            new UpdateContract(header, item.event.extrinsic, {
              id: item.event.id,
              contract,
              newCodeHash,
              oldCodeHash,
              owner: owneraddress
            })
          )
          break
        }
      }
    }
  }

  await Action.process(ctx, actions)
}
