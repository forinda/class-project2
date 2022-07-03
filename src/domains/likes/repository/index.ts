/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILike } from '../models/interface';
import { ILikeRepository } from '../interfaces';
import Like from '../models';
import feedsModel from '@blog-api-domains/feeds/models';

export class LikeRepository implements ILikeRepository {
	createLike: (like: ILike) => Promise<any> = async (like: ILike) => {
		const existingLike = await Like.findOne({ ...like });
		const post = await feedsModel.findById(like.entity);
		if (!post) 
			return {};
		
		if (existingLike) {
			await Like.findByIdAndDelete(existingLike._id);

			return existingLike;
		}
		const newLike = await Like.create({ ...like });

		return newLike;
	};
}
