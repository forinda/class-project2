import { BlogError } from '@blog-api-common/errors';
import { IFeeds } from '../models/interfaces';

export class FeedsEntity {
	public static createFeed = ({
		author,
		body,
		tags,
		views,
		isDeleted,
		media,
	}: IFeeds) => {
		if (body && body.length > 200) {
			throw new BlogError({
				message: 'Message is too long',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}

		return Object.freeze({
			getAuthor: () => author,
			getBody: () => body,
			getViews: () => views,
			getIsDeleted: () => isDeleted,
			getMedia: () => media,
			getTags: () => tags,
		});
	};
}
