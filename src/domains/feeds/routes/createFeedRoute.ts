import { FeedsController } from '../controllers';
import { Router } from 'express';
import { loginRequired } from '@blog-api-middlewares/auth';

export const createFeedRoute = ({ app }: { app: Router }) => {
	const feedController = new FeedsController();
	const router = Router();
	app.use(router);
	router.post('/new',loginRequired,feedController.createFeed);
};
