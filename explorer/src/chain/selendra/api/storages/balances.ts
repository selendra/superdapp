import assert from 'assert'
import {
  BalancesAccountStorage,
  BalancesTotalIssuanceStorage,
  SystemAccountStorage
} from '../../types/storage'
import { Block, ChainContext } from '../../types/support'
import { UnknownVersionError } from '../../../../utils'

const getBalancesAccountBalances = {
  async decode(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new BalancesAccountStorage(ctx, block)
    assert(storage.isExists)

    const mapData = (d: { free: bigint; reserved: bigint }) => ({
      free: d.free,
      reserved: d.reserved
    })

    if (storage.isV10000) {
      return storage.getManyAsV10000(accounts).then((data) => data.map(mapData))
    } else {
      throw new UnknownVersionError(storage.constructor.name)
    }
  }
}

const getSystemAccountBalances = {
  async decode(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new SystemAccountStorage(ctx, block)
    assert(storage.isExists)

    const mapData = (d: { data: { free: bigint; reserved: bigint } }) => ({
      free: d.data.free,
      reserved: d.data.reserved
    })

    if (storage.isV10000) {
      return storage.getManyAsV10000(accounts).then((data) => data.map(mapData))
    } else {
      throw new UnknownVersionError(storage.constructor.name)
    }
  }
}

const getTotalIssuance = {
  async decode(ctx: ChainContext, block: Block) {
    const storage = new BalancesTotalIssuanceStorage(ctx, block)
    assert(storage.isExists)

    if (storage.isV10000) {
      return await storage.getAsV10000()
    }

    throw new UnknownVersionError(storage.constructor.name)
  }
}


export default {
  getTotalIssuance,
  getSystemAccountBalances,
  getBalancesAccountBalances
}
