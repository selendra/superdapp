import { processor, processBalances } from './process/account'
import { TypeormDatabase } from '@subsquid/typeorm-store'

processor.run(new TypeormDatabase(), processBalances)