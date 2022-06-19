import { Router } from 'express';
import { loadAuthDomain } from '@blog-api-domains/auth';
import { loadUserDomain } from '@blog-api-domains/user';
import swagger from '@blog-api-swagger';

export default () => {
	const router = Router();
	swagger({ app: router });
	loadUserDomain({ app: router });
	loadAuthDomain({ app: router });
	
	return router;
};
