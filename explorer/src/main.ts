import { processor } from './processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import {
  blockHandler,
  balanceHandler,
  evmHandler,
  ContractHandler
} from './handler'

processor.run(new TypeormDatabase(), async (ctx) => {
  try {
    await blockHandler.process(ctx)
    await balanceHandler.process(ctx)
    await evmHandler.process(ctx)
    await ContractHandler.process(ctx)
  } catch (error) {
    console.log(error)
  }
})
