import assert from 'assert'
import { decodeHex } from '@subsquid/util-internal-hex'
import {
  ContractsContractInfoOfStorage,
  ContractsCodeInfoOfStorage
} from '../../types/storage'
import { decodeAddress, UnknownVersionError } from '../../../../utils'
import { Block, ChainContext } from '../../types/support'
import { CodeInfo, ContractInfo } from '../../types/v10000'

const getContractInfoOfStorage = {
  async decode(ctx: ChainContext, block: Block, accounts: string) {
    const storage = new ContractsContractInfoOfStorage(ctx, block)
    assert(storage.isExists)

    let info: ContractInfo | undefined
    const contractAccount = decodeAddress(accounts)

    if (storage.isV10000) {
      info = await storage.getAsV10000(contractAccount)
    } else {
      throw new UnknownVersionError(storage.constructor.name)
    }
    if (info) {
      return info
    }
    throw new Error(
      `ContractInfoOf not found in storage for accountId [${accounts}]`
    )
  }
}

const getCodeStorageStorage = {
  async decode(ctx: ChainContext, block: Block, accounts: string) {
    const storage = new ContractsCodeInfoOfStorage(ctx, block)
    assert(storage.isExists)

    const codeHash = decodeHex(accounts)

    let info: CodeInfo | undefined

    if (storage.isV10000) {
      info = await storage.getAsV10000(codeHash)
    } else {
      throw new Error('No Runtime version found')
    }
    if (info) {
      return info
    }

    throw new Error(`CodeStorage not found in storage for key [${accounts}]`)
  }
}

export default {
    getContractInfoOfStorage,
    getCodeStorageStorage
  }
  
