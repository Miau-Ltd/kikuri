import { Listener } from '@sapphire/framework'
import { Events } from 'discord.js'

export class Ready extends Listener {
    public constructor(ctx: Listener.LoaderContext) {
        super(ctx, {
            name: 'ready',
            emitter: 'isReady',
            once: true,
            event: Events.ClientReady
        })
    }
    
    public override async run() {
        const { client } = this.container

        client.logger.info('Bot has started successfully!')
    }
}