import { NormalisedContractsCallCall } from './сalls'
import {
  NormalisedBalancesAccountStorage,
  NormalisedCodeStorageStorage,
  NormalisedContractInfoOfStorage,
  NormalisedSystemAccountStorage
} from './storage'
import {
  NormalisedBalancesEndowedEvent,
  NormalisedBalancesReservedEvent,
  NormalisedBalancesTransferEvent,
  NormalisedBalancesWithdrawEvent,
  NormalisedContractEmittedEvent,
  NormalisedContractTerminatedEvent,
  NormalisedContractsCodeRemovedEvent,
  NormalisedContractsCodeStoredEvent,
  NormalisedContractsCodeUpdatedEvent,
  NormalisedContractsInstantiatedEvent,
  NormalisedSystemNewAccountEvent
} from './events'

export const api = {
  events: {
    NormalisedBalancesEndowedEvent,
    NormalisedBalancesReservedEvent,
    NormalisedBalancesTransferEvent,
    NormalisedBalancesWithdrawEvent,
    NormalisedContractEmittedEvent,
    NormalisedContractTerminatedEvent,
    NormalisedContractsCodeRemovedEvent,
    NormalisedContractsCodeStoredEvent,
    NormalisedContractsCodeUpdatedEvent,
    NormalisedContractsInstantiatedEvent,
    NormalisedSystemNewAccountEvent
  },
  storage: {
    NormalisedBalancesAccountStorage,
    NormalisedCodeStorageStorage,
    NormalisedContractInfoOfStorage,
    NormalisedSystemAccountStorage
  },
  calls: {
    NormalisedContractsCallCall
  }
}
