import { Command, CommandStore, InteractionHandlerStore, ListenerStore, SapphireClient, Store } from '@sapphire/framework'
import { BitFieldResolvable } from 'discord.js'

import '../typings/Prototypes'
import APIManager from '../lib/structures/APIManager'
import Queue from '../lib/structures/Queue'
import Task from '../lib/mods/Task'
import SettingsProvider from '../lib/structures/SettingsProvider'
import Components from './components'

declare module '@sapphire/framework' {
    interface SapphireClient {
        owner: string
        commandStore: CommandStore
        listenerStore: ListenerStore
        interactionHandlerStore: InteractionHandlerStore
        settings: SettingsProvider

        apiManager: APIManager<any>
        queue: Queue
    }
}

interface BotOptions {
    owner?: string
    defaultPrefix?: string
    token: string
    intents: number | BitFieldResolvable<any, any>
}

export default class Kikuri extends SapphireClient {
    owner: string
    commandStore: CommandStore
    listenerStore: ListenerStore
    interactionHandlerStore: InteractionHandlerStore
    settings: SettingsProvider

    apiManager: APIManager<any>
    queue: Queue


    public constructor(config: BotOptions) {
        super({
            intents: config.intents,
            defaultPrefix: config.defaultPrefix || '?'
        })

        this.owner = config.owner
    }

    private async _init() {
        //this.stores.registerPath(join(__dirname, '..', 'lib', 'stores'))

        this.commandStore = this.stores.get('commands')
        this.listenerStore = this.stores.get('listeners')
        this.interactionHandlerStore = this.stores.get('interaction-handlers')
        //this.stores.register(this.taskStore)

        const components = new Components(this)
        await components._loadAll()
    }

    public async start() {
        try {
            await this._init()
            return this.login(this.token)
        } catch {
            this.logger.fatal('Failed to start bot.')
            process.exit(1)
        }
    }
}