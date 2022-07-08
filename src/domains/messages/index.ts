import { Router } from 'express';
import { likePostRoute } from './routes/likeRoute';

export function loadLikeDomain({ app }: { app: Router }) {
	const likeDomain = Router();
	app.use('/like', likeDomain);
	likePostRoute({ app: likeDomain });
}
