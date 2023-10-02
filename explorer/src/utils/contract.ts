import { api } from '../chains'
import { SubstrateBlock } from '@subsquid/substrate-processor'
import { getOrCreateAccount, encodeAddress } from '.'
import { Extrinsic, Account, ContractCode } from '../model'
import { Ctx } from '../interfaces/handler'

/**
 * Creates the code owner Account entity and ContractCode entity
 * Used in instantiated, codeUpdated and codeStored handlers
 */
export async function createContractCodeEntities({
  ctx,
  block,
  codeHash,
  extrinsicEntity
}: {
  ctx: Ctx
  block: SubstrateBlock
  codeHash: string
  extrinsicEntity: Extrinsic
}): Promise<{ codeOwnerEntity: Account; contractCodeEntity: ContractCode }> {
  const { owner } = await new api.storage.NormalisedCodeStorageStorage(
    ctx,
    block
  ).get(codeHash)

  const codeOwnerEntity = await getOrCreateAccount(
    ctx.store,
    encodeAddress(owner),
    block
  )

  const contractCodeEntity = new ContractCode({
    id: codeHash,
    owner: codeOwnerEntity,
    createdFrom: extrinsicEntity,
    createdAt: extrinsicEntity.createdAt
  })

  return { codeOwnerEntity, contractCodeEntity }
}
