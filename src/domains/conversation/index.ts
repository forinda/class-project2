import { Router } from 'express';
import { createConversationRoute } from './routes/createConversationRoute';
import { getConversationRoute } from './routes/getConversationRoute';
import { getUserConversationsRoute } from './routes/getUserConversationsRoute';

export function loadConversationDomain({ app }: { app: Router }) {
	const conversationDomain = Router();
	app.use('/chats', conversationDomain);
	createConversationRoute({ app: conversationDomain });
	getConversationRoute({ app: conversationDomain });
	getUserConversationsRoute({ app: conversationDomain });
}
