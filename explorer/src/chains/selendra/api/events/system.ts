import { ResolvedNewAccountEvent } from '../../../interfaces/normalised'
import { SystemNewAccountEvent } from '../../types/events'
import { encodeId,  } from '../../../../utils'
import { config } from '../../config'

export class NormalisedSystemNewAccountEvent extends SystemNewAccountEvent {
  resolve(): ResolvedNewAccountEvent {
    if (this.isV1050) {
      return { account: encodeId(this.asV1050, config.prefix) }
    } else if (this.isV9160) {
        return { account: encodeId(this.asV9160.account, config.prefix) }
    }
    throw new Error(
      'No runtime version found while decoding [SystemNewAccountEvent]'
    )
  }
}
