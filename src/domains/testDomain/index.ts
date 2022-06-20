import { Router } from 'express';
import { baseRoute } from './routes/baseRoute';
import { testRoute } from './routes/testRoute';

export function loadTestDomain({ app }: { app: Router }) {
	const testDomain = Router();
	app.use('/', testDomain);
	testRoute({ app: testDomain });
	baseRoute({ app: testDomain });
}
