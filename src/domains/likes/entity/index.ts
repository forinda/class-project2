import { BlogError } from '@blog-api-common/errors';
import { ILike } from '../models/interface';
import { validateMongoId } from '@blog-api-helpers/validateMongoId';

export class LikeEntity {
	static createLike = ({ author, entity }: ILike) => {
		if (!validateMongoId(author)) {
			throw new BlogError({
				message: 'Invalid user id',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		if (!validateMongoId(entity)) {
			throw new BlogError({
				message: 'Invalid post id',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}

		return Object.freeze({
			getAuthor: () => author,
			getEntity: () => entity,
		});
	};
}
