import { SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { api } from "../../../chains";
import { ContractEvent } from '../../../model'
import abiDecoder from '../../../interfaces/abi/decoder'
import { createExtrinsic, createEvent, saveAll } from '../../../utils'
import { addDecodedEventEntities, decodeData } from '../metadata'
import {
  Ctx,
  Event,
  EventHandler,
  OptEntity
} from '../../../interfaces/handler'


export const contractsEmittedHandler: EventHandler = {
  name: 'Contracts.ContractEmitted',
  handle: async (
    ctx: Ctx,
    event: Event,
    block: SubstrateBlock
  ): Promise<void> => {
    const { store, log } = ctx
    const { extrinsic, call } = event
    if (extrinsic && call) {
      const entities: OptEntity[] = []
      const extrinsicEntity = createExtrinsic(extrinsic, call, block)
      const eventEntity = createEvent(extrinsicEntity, event)
      const { contract, data } = new api.events.NormalisedContractEmittedEvent(
        ctx,
        event
      ).resolve()
      const contractEventEntity = new ContractEvent({
        id: eventEntity.id,
        blockNumber: eventEntity.blockNumber,
        indexInBlock: eventEntity.indexInBlock,
        contractAddress: contract,
        data,
        createdAt: extrinsicEntity.createdAt,
        extrinsic: extrinsicEntity
      })

      entities.push(extrinsicEntity, eventEntity, contractEventEntity)

      // Decode data with ABI
      await decodeData(
        data,
        async (rawData: string | Uint8Array | Buffer) => {
          const { codeHash } = await new api.storage.NormalisedContractInfoOfStorage(
            ctx,
            block
          ).get(contract)

          const decodedElement = await abiDecoder.decodeEvent({
            codeHash: toHex(codeHash),
            data: rawData
          })

          addDecodedEventEntities({
            entities,
            decodedElement,
            contractEventEntity
          })
        },
        (errorMessage) =>
          log.error(
            { contract, block: block.height, data, error: errorMessage },
            'Error while decoding data at contract emitted event.'
          )
      )

      await saveAll(store, entities)
    } else {
      log.warn(
        { block: block.height, name: event.name, id: event.id },
        'No extrinsic or call field in event'
      )
      log.debug({ block, event })
    }
  }
}
