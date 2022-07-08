/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogError } from '@blog-api-common/errors';
import { ILike } from '../models/interface';
import { LikeEntity } from '../entity';
import { LikeRepository } from '../repository';
import { ILikeRepository, ILikeUseCase } from '../interfaces';

export class LikeUseCase implements ILikeUseCase {
	private repository: ILikeRepository = new LikeRepository();

	addLike: (like: ILike) => Promise<any> = async ({
		author,
		entity,
	}: ILike) => {
		if (!author) {
			throw new BlogError({
				message: 'Author id required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!entity) {
			throw new BlogError({
				message: 'Author id required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const { getAuthor, getEntity } = LikeEntity.createLike({
			author,
			entity,
		});

		const response = await this.repository.createLike({
			author: getAuthor(),
			entity: getEntity(),
		});

		return response;
	};
}
