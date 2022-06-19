import { AuthController } from '../controllers';
import { Router } from 'express';

export const loginRoute = ({ app }: { app: Router }) => {
	const authController = new AuthController();
	const router = Router();
	app.use(router);
	router.post('/login', authController.signIn);
};
