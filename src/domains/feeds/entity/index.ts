import { BlogError } from '@blog-api-common/errors';
import { IFeeds } from '../models/interfaces';

export class FeedsEntity {
	public static createFeed = ({
		author,
		body,
		exerpt,
		featuredImage,
		tags,
		title,
		views,
		isDeleted
	}: IFeeds) => {
		if (!title) {
			throw new BlogError({
				message: 'Title is required',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		// Exerpt
		if (!exerpt) {
			throw new BlogError({
				message: 'Exerpt is required',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		if (exerpt.length > 200) {
			throw new BlogError({
				message: 'Exerpt is too long',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		if (!body) {
			throw new BlogError({
				message: 'Body is required',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}

		return Object.freeze({
			getAuthor: () => author,
			getBody: () => body,
			getExerpt: () => exerpt,
			getFeaturedImage: () => featuredImage,
			getTags: () => tags,
			getTitle: () => title,
			getViews: () => views,
			getIsDeleted: () => isDeleted
		});
	};
}
