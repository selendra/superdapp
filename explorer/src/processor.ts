import {
  BatchContext,
  BatchProcessorCallItem,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor";
import { chain } from "./chain";
import { Store } from "@subsquid/typeorm-store";

export const processor = new SubstrateBatchProcessor()
  .setDataSource(chain.config.dataSource)
  .addEvent("*")
  .addCall("*")
  .includeAllBlocks()

if (chain.config.blockRange) processor.setBlockRange(chain.config.blockRange);
if (chain.config.typesBundle)
  processor.setTypesBundle(chain.config.typesBundle);

export type CallItem = BatchProcessorCallItem<typeof processor>
export type Item = BatchProcessorItem<typeof processor>;
export type ProcessorContext = BatchContext<Store, Item>;
