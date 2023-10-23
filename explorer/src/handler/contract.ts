import { chain } from '../chain'
import { Action } from '../action/base'
import { RemoveContract, EnsureAccount, CreateContract } from '../action'

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
      }
    }
  }

  await Action.process(ctx, actions)
}
