import { getChainConfig } from './config'
import {
  BatchContext,
  BatchProcessorCallItem,
  BatchProcessorEventItem,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from '@subsquid/substrate-processor';
import {Store} from '@subsquid/typeorm-store'

const { config } = getChainConfig()

export const blockProcessor = new SubstrateBatchProcessor()
  .setDataSource(config.dataSource)
  .setBlockRange(config.blockRange || {from: 0})
  .addEvent('*', {
    data: {
      event: {
        extrinsic: true,
        indexInBlock: true,
        args: true
      }
    }
  } as const)
  .addCall('*', {
    data: {
      call: {
        parent: true,
        args: true
      },
      extrinsic: true
    }
  } as const)
  .includeAllBlocks()

export type CallBlockItem = BatchProcessorCallItem<typeof blockProcessor>

export const accountProcessor = new SubstrateBatchProcessor()
  .setDataSource(config.dataSource)
  .setBlockRange(config.blockRange || {from: 0})
    .addEvent('Balances.Endowed', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Transfer', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.BalanceSet', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Reserved', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Unreserved', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.ReserveRepatriated', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Deposit', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Withdraw', {
        data: {event: {args: true}},
    } as const)
    .addEvent('Balances.Slashed', {
        data: {event: {args: true}},
    } as const)
    .addCall('*', {
        data: {call: {origin: true}},
    } as const)
  
export type AccountItem = BatchProcessorItem<typeof accountProcessor>
export type CallAccountItem = BatchProcessorCallItem<typeof accountProcessor>
export type EventAccountItem = BatchProcessorEventItem<typeof accountProcessor>
export type AccountContext = BatchContext<Store, AccountItem>