import { ConversationController } from '../controllers';
import { ConversationUseCase } from '../useCases';
import { Router } from 'express';
import { loginRequired } from '@blog-api-middlewares/auth';

export const createConversationRoute = ({ app }: { app: Router }) => {
	const likeController = new ConversationController(
		new ConversationUseCase(),
	);
	const router = Router();
	app.use(router);
	router.post('/', loginRequired, likeController.postNewConversation);
};
