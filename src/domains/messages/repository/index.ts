/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from '../models/interface';
import { IMessageRepository } from '../interfaces';
import Message from '../models';

export class MessageRepository implements IMessageRepository {
	createMessage: (message: IMessage) => Promise<any> = async (message) => {
		const newMessage = await Message.create(message);

		return newMessage;
	};

	deleteMessageById: (messageId: string) => Promise<any> = async (
		messageId,
	) => {
		await Message.findByIdAndUpdate(
			messageId,
			{ isDeleted: true },
			{ new: true },
		);

		return { deleted: true };
	};

	getConverMessages: (conversationId: string) => Promise<any> = async (
		conversationId,
	) => {
		const messages = await Message.find({ conversation: conversationId });

		return messages;
	};
}
