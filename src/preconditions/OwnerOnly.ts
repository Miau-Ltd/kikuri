import type { ChatInputCommandInteraction, ContextMenuCommandInteraction, Message } from 'discord.js'
import {
	AllFlowsPrecondition, Identifiers, MessageCommand, Precondition, PreconditionContext, PreconditionResult
} from '@sapphire/framework'

export class OwnerOnly extends Precondition {
	public constructor(ctx: Precondition.LoaderContext) {
		super(ctx, {
			name: 'OwnerOnly',
			position: 0
		})
	}

	public messageRun(message: Message<boolean>, command: MessageCommand, context: PreconditionContext): PreconditionResult {
		return message.author.id === '' ? this.ok() : this.makeSharedError()
	}

	public chatInputRun(interaction: ChatInputCommandInteraction): AllFlowsPrecondition.Result {
		return interaction.user.id === '' ? this.ok() : this.makeSharedError();
	}

	public contextMenuRun(interaction: ContextMenuCommandInteraction): AllFlowsPrecondition.Result {
		return interaction.user.id === '' ? this.ok() : this.makeSharedError();
	}

	private makeSharedError(): AllFlowsPrecondition.Result {
		return this.error({
			identifier: Identifiers.PreconditionUnavailable,
			message: 'Only the owner can run this command.',
		})
	}
}