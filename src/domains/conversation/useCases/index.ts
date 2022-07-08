/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogError } from '@blog-api-common/errors';
import { ConversationEntity } from '../entity';
import { ConversationRepository } from '../repository';
import { IConversationRepository, IConversationUseCase } from '../interfaces';

export class ConversationUseCase implements IConversationUseCase {
	private repository: IConversationRepository = new ConversationRepository();

	addConversation: (sender:string,receiver:string) => Promise<any> = async (
		sender,receiver,
	) => {
		const { getIsDeleted, getMembers } =
			ConversationEntity.createConversation({ members:[sender,receiver] });
		const existing = await this.repository.findByMembers(
			getMembers()[0],
			getMembers()[1],
		);
		if (existing.length>0) {
			throw new BlogError({
				message: 'Conversation already exist',
				status: 'warning',
				statusCode: 409,
				data: {},
			});
		}
		const response = await this.repository.createConversation({
			members: getMembers(),
			isDeleted: getIsDeleted(),
		});

		return response;
	};

	listConversation: (member1: string, member2: string) => Promise<any> =
		async (member1, member2) => {
			const response = await this.repository.findByMembers(
				member1,
				member2,
			);

			return response;
		};

	listUserConversations: (userId: string) => Promise<any> = async (
		userId,
	) => {
		const response = await this.repository.findByUserId(userId);

		return response;
	};
}
