import { Command } from '@sapphire/framework'
import { isMessageInstance } from '@sapphire/discord.js-utilities'
import type { Message, TextChannel } from 'discord.js'

export class PingCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			name: 'ping',
			aliases: ['pong'],
			description: 'ping pong'
		});
	}
	
	public async messageRun(message: Message) {
		if (!message.channel.isTextBased()) return

		const channel = message.channel as TextChannel
		const msg = await channel.send('Ping?')
		
		const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
			msg.createdTimestamp - message.createdTimestamp
		}ms.`
		
		return msg.edit(content)
	}
	
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder.setName('ping').setDescription('Ping bot to see if it is alive')
		)
	}
	
	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const msg = await interaction.reply({ content: `Ping?`, ephemeral: true, fetchReply: true })
		
		if (isMessageInstance(msg)) {
			const diff = msg.createdTimestamp - interaction.createdTimestamp;
			const ping = Math.round(this.container.client.ws.ping);
			return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`)
		}
		
		return interaction.editReply('Failed to retrieve ping :(')
	}
}