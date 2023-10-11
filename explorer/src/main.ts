import { processor} from './processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { blockHandler } from './handler'

processor.run(new TypeormDatabase(), async (ctx) => {
  await blockHandler.processBlock(ctx)
})