import { getChainConfig } from './config'
import {
  BatchContext,
  BatchProcessorCallItem,
  BatchProcessorEventItem,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from '@subsquid/substrate-processor';
import {Store} from '@subsquid/typeorm-store'

const CHAIN_CONFIG = getChainConfig()

export const processor = new SubstrateBatchProcessor()
  .setDataSource(CHAIN_CONFIG.dataSource)
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

export type CallItem = BatchProcessorCallItem<typeof processor>
type Item = BatchProcessorItem<typeof processor>
type EventItem = BatchProcessorEventItem<typeof processor>
type Context = BatchContext<Store, Item>