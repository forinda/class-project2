import { FeedsController } from '../controllers';
import { Router } from 'express';
import { loginRequired } from '@blog-api-middlewares/auth';

export const getFeedRoute = ({ app }: { app: Router }) => {
	const feedController = new FeedsController();
	const router = Router();
	app.use(router);
	router.get('/feed/:id', loginRequired,feedController.getFeed);
};
