import { BLACKLIST_CONFIG, getChainConfig } from './config'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { Block as BlockEntity, Call, Event, Extrinsic } from './model'
import {
  BatchProcessorCallItem,
  SubstrateBatchProcessor
} from '@subsquid/substrate-processor'
import { getParsedArgs, ItemsLogger } from './utils/common'

const CHAIN_CONFIG = getChainConfig()

export const processor = new SubstrateBatchProcessor()
  //.setBlockRange(CHAIN_CONFIG.blockRange ?? { from: 1_000_000 })
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
