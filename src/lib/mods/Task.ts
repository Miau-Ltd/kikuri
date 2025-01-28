import { Piece } from '@sapphire/framework'
import TaskStore from '../stores/TaskStore'

export default class Task extends Piece {
    storeHandler: TaskStore

    public constructor(opts: Piece.Options, ctx?: Piece.LoaderContext) {
        super(ctx, {...opts})
    }

    exec(..._: any): any { throw new Error('Not implemented!') }
}