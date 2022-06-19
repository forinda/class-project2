import { Router } from 'express';
import { UserController } from '../controllers';
import { UserUseCases } from '../useCases';

export const searchUserRoute =  ({ app }: { app: Router }) => {
	const userController = new UserController(new UserUseCases());
	const router = Router();
	app.use(router);
	router.post('/search', userController.searchUserController);
};
