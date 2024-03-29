import { chain } from '../chain'
import { Action } from '../action/base'
import {
  RemoveContract,
  EnsureAccount,
  CreateContract,
  TerminatedContract,
  CodeStoredContract,
  ContractEmittedContract,
  UpdateContract,
  CallContract
} from '../action'
import { encodeAddress, getSignerAddress } from '../utils'

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
              id: item.event.id,
              contractInfo,
              deployer: data.deployer,
              contract: data.contract,
              args: item.event.call.args
            })
          )
          break
        }
        case 'Contracts.Terminated': {
          const data = chain.api.events.contract.ContractTerminated.decode(
            ctx,
            item.event
          )

          const { signature } = item.event.extrinsic
          let signer: string = 'undefine'
          if (signature != null) {
            signer = getSignerAddress(signature)
          }
          actions.push(
            new EnsureAccount(header, item.extrinsic, {
              id: data.beneficiary
            }),
            new EnsureAccount(header, item.extrinsic, {
              id: data.contract
            }),
            new EnsureAccount(header, item.extrinsic, {
              id: signer
            }),

            new TerminatedContract(header, item.event.extrinsic, {
              id: item.event.id,
              beneficiary: data.beneficiary,
              contract: data.contract,
              signer: signer,
              args: item.event.call.args
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
              owner: owneraddress,
              id: item.event.id,
              args: item.event.call.args
            })
          )
          break
        }
        case 'Contracts.ContractEmitted': {
          const { contract, data } =
            chain.api.events.contract.ContractEmitted.decode(ctx, item.event)

          const { codeHash } =
            await chain.api.storages.contract.getContractInfoOfStorage.decode(
              ctx,
              header,
              contract
            )

          actions.push(
            new ContractEmittedContract(header, item.event.extrinsic, {
              id: item.event.id,
              contract,
              data,
              codeHash,
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

          const { signature } = item.event.extrinsic

          let signer: string = 'undefine'
          if (signature != null) {
            signer = getSignerAddress(signature)
          }

          actions.push(
            new EnsureAccount(header, item.extrinsic, {
              id: owneraddress
            }),
            new EnsureAccount(header, item.extrinsic, {
              id: signer
            }),
            new UpdateContract(header, item.event.extrinsic, {
              id: item.event.id,
              contract,
              newCodeHash,
              oldCodeHash,
              owner: owneraddress,
              args: item.event.call.args,
              signer
            })
          )
          break
        }
        case 'Contracts.call': {
          const { contractAddress, data } =
            chain.api.calls.contract.ContractsCall.decode(ctx, item.call)

          const { signature } = item.extrinsic

          let from: string = 'undefine'
          if (signature != null) {
            from = getSignerAddress(signature)
          }

          actions.push(
            new EnsureAccount(header, item.extrinsic, {
              id: contractAddress
            }),
            new EnsureAccount(header, item.extrinsic, {
              id: from
            }),
            new CallContract(header, item.extrinsic, {
              id: item.call.id,
              from,
              contractAddress,
              data
            })
          )
          break
        }
      }
    }
  }

  await Action.process(ctx, actions)
}
