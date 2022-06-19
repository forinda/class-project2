import { Router } from 'express';
import { createFeedRoute } from './routes/createFeedRoute';
import { deleteFeedRoute } from './routes/deleteFeedRoute';
import { getFeedByTagRoute } from './routes/getFeedsByTag';
import { getFeedByUserRoute } from './routes/getFeedByUserRoute';
import { getFeedsByTitleRoute } from './routes/getFeedByTitle';
import { getFeedsRoute } from './routes/getFeedsRoute';
import { getFollowedFeedsRoute } from './routes/getFollowedFeedsRoute';
import { searchFeedsRoute } from './routes/searchFeed';
import { updateFeedRoute } from './routes/updateFeedsRoute';

export function loadFeedsDomain({ app }: { app: Router }) {
	const feedsRouter = Router();
	app.use('/feeds', feedsRouter);
	createFeedRoute({ app: feedsRouter });
	deleteFeedRoute({ app: feedsRouter });
	getFeedsByTitleRoute({ app: feedsRouter });
	getFeedByUserRoute({ app: feedsRouter });
	getFeedsRoute({ app: feedsRouter });
	getFeedByTagRoute({ app: feedsRouter });
	getFollowedFeedsRoute({ app: feedsRouter });
	searchFeedsRoute({ app: feedsRouter });
	updateFeedRoute({ app: feedsRouter });
}
