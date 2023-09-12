
import assert from 'assert'
import { SubstrateBlock, SubstrateExtrinsic} from '@subsquid/substrate-processor'
import { withErrorContext } from '@subsquid/util-internal'
import { Context } from '../..'

export abstract class Action<T = unknown> {
    static async process(ctx: Context, actions: Action[]) {
        for (const action of actions) {
            const actionCtx = {
                ...ctx,
                log: ctx.log.child('actions', {
                    block: action.block.id,
                    extrinsic: action.extrinsic?.hash,
                }),
            }

            await action.perform(actionCtx).catch(
                withErrorContext({
                    block: action.block.id,
                    extrinsicHash: action.extrinsic?.hash,
                })
            )
        }
    }

    protected performed = false

    constructor(
        readonly block: Pick<SubstrateBlock, 'id' | 'id' | 'hash' | 'height' | 'timestamp'>,
        readonly extrinsic: Pick<SubstrateExtrinsic, 'id' | 'hash'> | undefined,
        readonly data: T
    ) {}

    async perform(ctx: Context): Promise<void> {
        assert(!this.performed)
        await this._perform(ctx)
        this.performed = true
    }

    protected abstract _perform(ctx: Context): Promise<void>
}

export class LazyAction extends Action {
    constructor(
        readonly block: Pick<SubstrateBlock, 'id' | 'hash' | 'height' | 'timestamp'>,
        readonly extrinsic: Pick<SubstrateExtrinsic, 'id' | 'hash'> | undefined,
        readonly cb: (ctx: Context) => Promise<Action[]>
    ) {
        super(block, extrinsic, {})
    }

    protected async _perform(ctx: Context): Promise<void> {
        const actions = await this.cb(ctx)
        await Action.process(ctx, actions)
    }
}