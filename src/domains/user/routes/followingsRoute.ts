import { Router } from 'express';
import { UserController } from '../controllers';
import { UserUseCases } from '../useCases';
import { loginRequired } from '@blog-api-middlewares/auth';

export const followingsRoute =  ({ app }: { app: Router }) => {
	const userController = new UserController(new UserUseCases());
	const router = Router();
	app.use(router);
	router.get('/followings', loginRequired,userController.followingsController);
};
