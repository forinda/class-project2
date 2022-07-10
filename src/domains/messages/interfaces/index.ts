/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from '../models/interface';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export interface IMessageController {
	postnewMessage: (req: IReq, res: IRes, next: INext) => Promise<any>;
	deleteMessage: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getMessagesByConversation: (req: IReq, res: IRes, next: INext) => Promise<any>;
}

export interface IMessageUseCase {
	addMessage: (message: IMessage) => Promise<any>;
	removeMessage: (messageId: string) => Promise<any>;
	listMessageByConversation: (conversationId: string) => Promise<any>;
}

export interface IMessageRepository {
	createMessage: (message: IMessage) => Promise<any>;
	deleteMessageById: (messageId: string) => Promise<any>;
	getConverMessages: (conversationId: string) => Promise<any>;
}
