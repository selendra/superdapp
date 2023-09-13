import { Processor, processBlock, processAccounts } from './process'
import { TypeormDatabase } from '@subsquid/typeorm-store'

Processor.run(new TypeormDatabase(), async (ctx) => {
  // await processBlock(ctx)
  await processAccounts(ctx)
})
