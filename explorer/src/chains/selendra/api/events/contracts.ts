// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable max-classes-per-file */
import { toHex } from '@subsquid/util-internal-hex'
import { encodeAddress } from '../../../../utils'
import {
  ResolvedContractCodeRemovedEvent,
  ResolvedContractEmittedEvent,
  ResolvedContractsCodeStoredEvent,
  ResolvedContractsCodeUpdatedEvent,
  ResolvedContractsInstantiatedEvent,
  ResolvedContractTerminatedEvent,
} from '../../../../interfaces/normalised'

import {
  ContractsCodeRemovedEvent,
  ContractsCodeStoredEvent,
  ContractsContractEmittedEvent,
  ContractsInstantiatedEvent,
  ContractsTerminatedEvent,
  ContractsContractCodeUpdatedEvent
} from '../../types/events'

export class NormalisedContractsCodeRemovedEvent extends ContractsCodeRemovedEvent {
  resolve(): ResolvedContractCodeRemovedEvent {
    if (this.isV10000) {
      const { codeHash } = this.asV10000
      return { codeHash: toHex(codeHash) }
    }
    throw new Error(
      'No runtime version found while decoding [ContractsCodeRemovedEvent]'
    )
  }
}

export class NormalisedContractsInstantiatedEvent extends ContractsInstantiatedEvent {
  resolve(): ResolvedContractsInstantiatedEvent {
    if (this.isV10000) {
      const { deployer, contract } = this.asV10000
      return {
        deployer: encodeAddress(deployer),
        contract: encodeAddress(contract)
      }
    }
    throw new Error(
      'No runtime version found while decoding [ContractsInstantiatedEvent]'
    )
  }
}

export class NormalisedContractsCodeStoredEvent extends ContractsCodeStoredEvent {
  resolve(): ResolvedContractsCodeStoredEvent {
    if (this.asV10000) {
      const { codeHash } = this.asV10000
      return { codeHash: toHex(codeHash) }
    }
    throw new Error(
      'No runtime version found while decoding [ContractsCodeStoredEvent]'
    )
  }
}

export class NormalisedContractsCodeUpdatedEvent extends ContractsContractCodeUpdatedEvent {
  resolve(): ResolvedContractsCodeUpdatedEvent {
    if (this.isV10000) {
      const { contract, newCodeHash, oldCodeHash } = this.asV10000
      return {
        contract: encodeAddress(contract),
        newCodeHash: toHex(newCodeHash),
        oldCodeHash: toHex(oldCodeHash)
      }
    }
    throw new Error(
      'No runtime version found while decoding [ContractsContractCodeUpdatedEvent]'
    )
  }
}

export class NormalisedContractEmittedEvent extends ContractsContractEmittedEvent {
  resolve(): ResolvedContractEmittedEvent {
    if (this.isV10000) {
      const { contract, data } = this.asV10000
      return { contract: encodeAddress(contract), data }
    }
    throw new Error(
      'No runtime version found while decoding [ContractsContractEmittedEvent]'
    )
  }
}

export class NormalisedContractTerminatedEvent extends ContractsTerminatedEvent {
  resolve(): ResolvedContractTerminatedEvent {
    if (this.isV10000) {
      const { contract, beneficiary } = this.asV10000
      return {
        contract: encodeAddress(contract),
        beneficiary: encodeAddress(beneficiary)
      }
    }
    throw new Error(
      'No runtime version found while decoding [ContractsTerminatedEvent]'
    )
  }
}
