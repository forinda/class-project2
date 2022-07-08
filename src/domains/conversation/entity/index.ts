import { BlogError } from '@blog-api-common/errors';
import { IConversation } from '../models/interface';
import { validateMongoId } from '@blog-api-helpers/validateMongoId';

export class ConversationEntity {
	static createConversation = ({ members, isDeleted }: IConversation) => {
		if (members.length < 2) {
			throw new BlogError({
				message: 'Conversation members required',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		if (!validateMongoId(members[0])) {
			throw new BlogError({
				message: 'Invalid user id 1',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		if (!validateMongoId(members[1])) {
			throw new BlogError({
				message: 'Invalid user id 2',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		if (members[0] === members[1]) {
			throw new BlogError({
				message: 'You cannot create a chat with yourself',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}

		return Object.freeze({
			getMembers: () => members,
			getIsDeleted: () => (isDeleted ? isDeleted : false),
		});
	};
}
