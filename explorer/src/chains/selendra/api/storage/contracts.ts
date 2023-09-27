import assert from 'assert'
import { ResolvedContractInfoOfStorage } from '../../../../interfaces/normalised'
import { ContractsContractInfoOfStorage } from '../../types/storage'
import { decodeAddress } from '../../../../utils'

export class NormalisedContractInfoOfStorage extends ContractsContractInfoOfStorage {
  async get(accountId: string): Promise<ResolvedContractInfoOfStorage> {
    assert(this.isExists)

    let info: ResolvedContractInfoOfStorage | undefined
    const contractAccount = decodeAddress(accountId)

    if (this.isV10000) {
      info = await this.getAsV10000(contractAccount)
    } else {
      throw new Error('No Runtime version found')
    }
    if (info) {
      return info
    }
    throw new Error(
      `ContractInfoOf not found in storage for accountId [${accountId}]`
    )
  }
}
