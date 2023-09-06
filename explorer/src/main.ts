import { accountProcessor, processBalances } from './process/account'
import { TypeormDatabase } from '@subsquid/typeorm-store'

accountProcessor.run(new TypeormDatabase(), processBalances)