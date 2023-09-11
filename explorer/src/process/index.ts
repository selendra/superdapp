import { getChain } from '../chains'
import {
  BatchContext,
  BatchProcessorCallItem,
  BatchProcessorEventItem,
  BatchProcessorItem,
  SubstrateBatchProcessor
} from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
export { processBlock } from './block'
export { processBalances } from './account/balance'

const { config } = getChain()

export const Processor = new SubstrateBatchProcessor()
  .setDataSource(config.dataSource)
  .setBlockRange(config.blockRange || { from: 0 })
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
        args: true,
        origin: true
      },
      extrinsic: true
    }
  } as const)
  .includeAllBlocks()

export type CallItem = BatchProcessorCallItem<typeof Processor>
export type Item = BatchProcessorItem<typeof Processor>
export type EventItem = BatchProcessorEventItem<typeof Processor>
export type Context = BatchContext<Store, Item>
