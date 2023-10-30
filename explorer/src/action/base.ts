
import assert from 'assert'
import { SubstrateBlock, SubstrateExtrinsic} from '@subsquid/substrate-processor'
import { withErrorContext } from '@subsquid/util-internal'
import { ProcessorContext } from '../processor'

export abstract class Action<T = unknown> {
    static async process(ctx: ProcessorContext, actions: Action[]) {
        for (const action of actions) {
            const actionCtx = {
                ...ctx,
                log: ctx.log.child('actions', {
                    block: action.block.height,
                    extrinsic: action.extrinsic?.hash,
                }),
            }

            await action.perform(actionCtx).catch(
                withErrorContext({
                    block: action.block.height,
                    extrinsicHash: action.extrinsic?.hash,
                })
            )
        }
    }

    protected performed = false

    constructor(
        readonly block: SubstrateBlock,
        readonly extrinsic: SubstrateExtrinsic,
        readonly data: T
    ) {}

    async perform(ctx: ProcessorContext): Promise<void> {
        assert(!this.performed)
        await this._perform(ctx)
        this.performed = true
    }

    protected abstract _perform(ctx: ProcessorContext): Promise<void>
}

export class LazyAction extends Action {
    constructor(
        readonly block: SubstrateBlock,
        readonly extrinsic: SubstrateExtrinsic,
        readonly cb: (ctx: ProcessorContext) => Promise<Action[]>
    ) {
        super(block, extrinsic, {})
    }

    protected async _perform(ctx: ProcessorContext): Promise<void> {
        const actions = await this.cb(ctx)
        await Action.process(ctx, actions)
    }
}