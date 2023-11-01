// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable max-classes-per-file */
import { toHex } from '@subsquid/util-internal-hex'
import { encodeAddress, UnknownVersionError } from '../../../../utils'
import {
  ContractsCodeRemovedEvent,
  ContractsCodeStoredEvent,
  ContractsContractEmittedEvent,
  ContractsInstantiatedEvent,
  ContractsTerminatedEvent,
  ContractsContractCodeUpdatedEvent
} from '../../types/events'
import { ChainContext, Event } from '../../types/support'

const ContractsCodeRemoved = {
  decode(ctx: ChainContext, event: Event) {
    let e = new ContractsCodeRemovedEvent(ctx, event)
    if (e.isV10000) {
      const { codeHash } = e.asV10000
      return { codeHash: toHex(codeHash) }
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const ContractsInstantiated = {
  decode(ctx: ChainContext, event: Event) {
    let e = new ContractsInstantiatedEvent(ctx, event)
    if (e.isV10000) {
      const { deployer, contract } = e.asV10000
      return {
        deployer: encodeAddress(deployer),
        contract: encodeAddress(contract)
      }
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const ContractsCodeStored = {
  decode(ctx: ChainContext, event: Event) {
    let e = new ContractsCodeStoredEvent(ctx, event)
    if (e.isV10000) {
      const { codeHash } = e.asV10000
      return { codeHash: toHex(codeHash) }
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const ContractsCodeUpdated = {
  decode(ctx: ChainContext, event: Event) {
    let e = new ContractsContractCodeUpdatedEvent(ctx, event)
    if (e.isV10000) {
      const { contract, newCodeHash, oldCodeHash } = e.asV10000
      return {
        contract: encodeAddress(contract),
        newCodeHash: toHex(newCodeHash),
        oldCodeHash: toHex(oldCodeHash)
      }
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const ContractEmitted = {
  decode(ctx: ChainContext, event: Event) {
    let e = new ContractsContractEmittedEvent(ctx, event)
    if (e.isV10000) {
      const { contract, data } = e.asV10000
      return { contract: encodeAddress(contract), data }
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

const ContractTerminated = {
  decode(ctx: ChainContext, event: Event) {
    let e = new ContractsTerminatedEvent(ctx, event)
    if (e.isV10000) {
      const { contract, beneficiary } = e.asV10000
      return {
        contract: encodeAddress(contract),
        beneficiary: encodeAddress(beneficiary)
      }
    } else {
      throw new UnknownVersionError(e)
    }
  }
}

export default {
  ContractsCodeRemoved,
  ContractsInstantiated,
  ContractsCodeStored,
  ContractsCodeUpdated,
  ContractEmitted,
  ContractTerminated
}
