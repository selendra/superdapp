import { ContractsCallCall } from '../../types/calls'
import { MultiAddress, Weight } from '../../types/v10000'
import { encodeAddress, UnknownVersionError } from '../../../../utils'
import { ChainContext, Call } from '../../types/support'

const ContractsCall = {
  decode(ctx: ChainContext, call: Call) {
    let e = new ContractsCallCall(ctx, call)
    if (e.isV10000) {
      const { dest, value, gasLimit, storageDepositLimit, data } =
        e.asV10000 as {
          dest: MultiAddress
          value: bigint
          gasLimit: Weight
          storageDepositLimit: bigint | undefined
          data: Uint8Array
        }
      if (dest.__kind === 'Index') {
        throw new Error('Multi-address of type Index is not supported!')
      }
      return {
        contractAddress: encodeAddress(dest.value),
        value,
        gasLimit,
        storageDepositLimit,
        data
      }
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

export default {
    ContractsCall
  }
  