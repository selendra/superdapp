import { ResolvedNewAccountEvent } from '../../../../interfaces/normalised'
import { SystemNewAccountEvent } from '../../types/events'
import { encodeAddress } from '../../../../utils'

export class NormalisedSystemNewAccountEvent extends SystemNewAccountEvent {
  resolve(): ResolvedNewAccountEvent {
    if (this.isV10000) {
      return { account: encodeAddress(this.asV10000.account) }
    }
    throw new Error(
      'No runtime version found while decoding [SystemNewAccountEvent]'
    )
  }
}
