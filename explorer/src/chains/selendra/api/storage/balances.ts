import assert from 'assert'
import {
  BalancesAccountStorage,
  SystemAccountStorage
} from '../../types/storage'
import { AccountData } from '../../../../interfaces/normalised'
import { decodeAddress} from '../../../../utils'

export class NormalisedSystemAccountStorage extends SystemAccountStorage {
  async get(accountId: string): Promise<AccountData> {
    assert(this.isExists)
    if (this.isV10000) {
      const storage = (await this.getAsV10000(decodeAddress(accountId))).data

      const accountData: AccountData = {
        free: storage.free,
        reserved: storage.reserved,
        miscFrozen: storage.frozen,
        feeFrozen: storage.flags
      }

      return accountData
    }
    throw new Error('No Runtime version found')
  }
}

export class NormalisedBalancesAccountStorage extends BalancesAccountStorage {
  async get(accountId: string): Promise<AccountData> {
    assert(this.isExists)
    if (this.isV10000) {
      const storage = await this.getAsV10000(decodeAddress(accountId))

      const accountData: AccountData = {
        free: storage.free,
        reserved: storage.reserved,
        miscFrozen: storage.frozen,
        feeFrozen: storage.flags
      }

      return accountData
    }
    throw new Error('No Runtime version found')
  }
}
