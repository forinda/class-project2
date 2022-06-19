import { Router } from 'express';
import { loginRoute } from './routes/loginRoute';

export function loadAuthDomain({ app }: { app: Router }) {
	const authDomain = Router();
	app.use('/auth', authDomain);
	loginRoute({ app: authDomain });
}
