import { blockProcessor, accountProcessor, CallBlockItem } from './processor'
import { processBlock, processBalances } from "./process"
import { TypeormDatabase } from '@subsquid/typeorm-store'

blockProcessor.run(new TypeormDatabase(), async (ctx) => {
   await processBlock(ctx);
})

accountProcessor.setPrometheusPort(3001).run(new TypeormDatabase(), async (ctx) => {
   await processBalances(ctx);
})
