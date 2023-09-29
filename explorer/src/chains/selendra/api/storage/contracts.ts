import assert from 'assert'
import { decodeHex } from "@subsquid/util-internal-hex";
import { ResolvedContractInfoOfStorage, ResolvedCodeInfoOfStorage } from '../../../../interfaces/normalised'
import { ContractsContractInfoOfStorage, ContractsCodeInfoOfStorage, } from '../../types/storage'
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

export class NormalisedCodeStorageStorage extends ContractsCodeInfoOfStorage {
  async get(key: string): Promise<ResolvedCodeInfoOfStorage> {
    assert(this.isExists);
    let info: ResolvedCodeInfoOfStorage | undefined;
    const codeHash = decodeHex(key);
    if (this.isV10000) {
      info = await this.getAsV10000(codeHash);
    } else {
      throw new Error("No Runtime version found");
    }
    if (info) {
      return info;
    }
    throw new Error(`CodeStorage not found in storage for key [${key}]`);
  }
}
