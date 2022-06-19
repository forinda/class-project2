import { FeedsController } from '../controllers';
import { Router } from 'express';
import { loginRequired } from '@blog-api-middlewares/auth';

export const searchFeedsRoute = ({ app }: { app: Router }) => {
	const feedController = new FeedsController();
	const router = Router();
	app.use(router);
	router.post('/search', loginRequired,feedController.search);
};
