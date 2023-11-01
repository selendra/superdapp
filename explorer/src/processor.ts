import {
  BatchContext,
  BatchProcessorCallItem,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor";
import { chain } from "./chain";
import { Store } from "@subsquid/typeorm-store";
import * as erc20 from './abi/erc20';
import * as erc721 from './abi/erc721';
import * as erc1155 from './abi/erc1155';

export const processor = new SubstrateBatchProcessor()
  .setDataSource(chain.config.dataSource)
  .addEvent("*")
  .addCall("*")
  .addEvmLog("*", {
    filter: [
      [
        erc20.events.Transfer.topic,
        erc721.events.Transfer.topic,
        erc1155.events.TransferBatch.topic,
        erc1155.events.TransferSingle.topic,
        erc1155.events.URI.topic
      ]
    ],
  })
  .includeAllBlocks()

if (chain.config.blockRange) processor.setBlockRange(chain.config.blockRange);
if (chain.config.typesBundle)
  processor.setTypesBundle(chain.config.typesBundle);

export type CallItem = BatchProcessorCallItem<typeof processor>
export type Item = BatchProcessorItem<typeof processor>;
export type ProcessorContext = BatchContext<Store, Item>;
