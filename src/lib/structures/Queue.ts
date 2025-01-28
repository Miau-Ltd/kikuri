import Kikuri from '../../client/kikuri'

export default class Queue {
    protected _queue: any[]
    protected _running: boolean
    protected client: Kikuri

    constructor(cli: Kikuri) {
        this._queue = []
        this._running = false
        this.client = cli
    }

    get length() { return this._queue.length }

    add(task: any) {
        this._queue.push(task)
        if (!this._running) this._run()
    }

    private _run() {
        this._running = true
        const task: any = this._queue.shift()

        if (!task) this._running = false
        else {
            task?.isFunc() ? task().then(() => this._run()).catch((err: any) => { this.client.logger.error('ERROR', err) }) : void 0
        }
    }
}