/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from '../models/interface';
import { MessageEntity } from '../entity';
import { MessageRepository } from '../repository';
import { IMessageRepository, IMessageUseCase } from '../interfaces';

export class MessageUseCase implements IMessageUseCase {
	private repository: IMessageRepository = new MessageRepository();

	addMessage: (message: IMessage) => Promise<any> = async (message) => {
		const { getConversation, getIsDeleted, getSender, getText } =
			MessageEntity.createMessage(message);
		const response = await this.repository.createMessage({
			conversation: getConversation(),
			sender: getSender(),
			text: getText(),
			isDeleted: getIsDeleted(),
		});

		return response;
	};

	removeMessage: (messageId: string) => Promise<any> = async (messageId) => {
		const response = await this.repository.deleteMessageById(messageId);

		return response;
	};

	listMessageByConversation: (conversationId: string) => Promise<any> =
		async (conversationId) => {
			const messages = await this.repository.getConverMessages(
				conversationId,
			);

			return messages;
		};
}
