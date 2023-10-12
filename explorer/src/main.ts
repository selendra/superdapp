import { processor} from './processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { blockHandler, balanceHandler } from './handler'

processor.run(new TypeormDatabase(), async (ctx) => {
  await blockHandler.process(ctx)
  await balanceHandler.process(ctx)
})