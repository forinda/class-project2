/* eslint-disable @typescript-eslint/no-explicit-any */
import Conversation from '../models';
import { IConversation } from '../models/interface';
import { IConversationRepository } from '../interfaces';

export class ConversationRepository implements IConversationRepository {
	createConversation: (conversation: IConversation) => Promise<any> = async (
		conversation,
	) => {
		const newConversation = await Conversation.create(conversation);

		return newConversation;
	};

	findByMembers: (member1: string, member2: string) => Promise<any> = async (
		member1,
		member2,
	) => {
		const conversations = await Conversation.find({
			members: { $all: [member1, member2] },
		});

		return conversations;
	};

	findByUserId: (userId: string) => Promise<any> = async (userId) => {
		const conversations = await Conversation.find({
			members: { $in: [userId] },
		});

		return conversations;
	};
}
