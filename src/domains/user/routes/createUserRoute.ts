import { Router } from 'express';
import { UserController } from '../controllers';
import { UserUseCases } from '../useCases';

export const createUserRoute = ({ app }: { app: Router }) => {
	const userController = new UserController(new UserUseCases());
	const router = Router();
	app.use(router);
	router.post('/new', userController.newUserController);
};
