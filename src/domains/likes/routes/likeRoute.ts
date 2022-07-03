import { LikeController } from '../controllers';
import { LikeUseCase } from '../useCases';
import { Router } from 'express';
import { loginRequired } from '@blog-api-middlewares/auth';

export const likePostRoute = ({ app }: { app: Router }) => {
	const likeController = new LikeController(new LikeUseCase());
	const router = Router();
	app.use(router);
	router.post('/:id', loginRequired,likeController.likePost);
};
