import { BlogError } from '@blog-api-common/errors';
import { IMessage } from '../models/interface';
import { validateMongoId } from '@blog-api-helpers/validateMongoId';

export class MessageEntity {
	static createMessage = ({
		conversation,
		sender,
		text,
		isDeleted,
	}: IMessage) => {
		if (!validateMongoId(sender)) {
			throw new BlogError({
				message: 'Invalid sender id',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		if (!validateMongoId(conversation)) {
			throw new BlogError({
				message: 'Invalid conversation id',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		if (!validateMongoId(text)) {
			throw new BlogError({
				message: 'Message cannot be empty',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}

		return Object.freeze({
			getConversation: () => conversation,
			getText: () => text,
			getSender: () => sender,
			getIsDeleted: () => (isDeleted ? isDeleted : false),
		});
	};
}
