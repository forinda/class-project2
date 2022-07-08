import { Router } from 'express';
import { loadAuthDomain } from '@blog-api-domains/auth';
import { loadConversationDomain } from '@blog-api-domains/conversation';
import { loadFeedsDomain } from '@blog-api-domains/feeds';
import { loadLikeDomain } from '@blog-api-domains/likes';
import { loadTestDomain } from '@blog-api-domains/testDomain';
import { loadUserDomain } from '@blog-api-domains/user';
import swagger from '@blog-api-swagger';

export default () => {
	const router = Router();
	swagger({ app: router });
	loadUserDomain({ app: router });
	loadAuthDomain({ app: router });
	loadFeedsDomain({ app: router });
	loadTestDomain({ app: router });
	loadLikeDomain({ app: router });
	loadConversationDomain({app:router});

	return router;
};
