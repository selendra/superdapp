import { accountProcessor, processBalances } from './process/account'
import {blockProcessor, processBlock } from './process/block'
import { TypeormDatabase } from '@subsquid/typeorm-store'

// blockProcessor.run(new TypeormDatabase(), async (ctx) => {
//    await processBlock(ctx);
// })

accountProcessor.setPrometheusPort(3001).run(new TypeormDatabase(), processBalances)