/* eslint-disable @typescript-eslint/no-explicit-any */
import { IConversation } from '../models/interface';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export interface IConversationController {
	postNewConversation: (req: IReq, res: IRes, next: INext) => Promise<any>;
	findAllUserConversations: (
		req: IReq,
		res: IRes,
		next: INext,
	) => Promise<any>;
	findConversation: (req: IReq, res: IRes, next: INext) => Promise<any>;
}

export interface IConversationUseCase {
	addConversation: (sender:string,receiver:string) => Promise<any>;
	listConversation: (member1: string, member2: string) => Promise<any>;
	listUserConversations: (userId: string) => Promise<any>;
}

export interface IConversationRepository {
	createConversation: (conversation: IConversation) => Promise<any>;
	findByMembers: (member1: string, member2: string) => Promise<any>;
	findByUserId: (userId: string) => Promise<any>;
}
