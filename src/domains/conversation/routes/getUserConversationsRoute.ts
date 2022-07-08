import { ConversationController } from '../controllers';
import { ConversationUseCase } from '../useCases';
import { Router } from 'express';
import { loginRequired } from '@blog-api-middlewares/auth';

export const getUserConversationsRoute = ({ app }: { app: Router }) => {
	const likeController = new ConversationController(
		new ConversationUseCase(),
	);
	const router = Router();
	app.use(router);
	router.get('/', loginRequired, likeController.findAllUserConversations);
};