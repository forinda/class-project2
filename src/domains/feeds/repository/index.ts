/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FeedsModel from '../models';
import { IFeeds } from '../models/interfaces';
import { IFeedsRepository } from '../interfaces';
import userModel from '@blog-api-domains/user/models';

export class FeedsRepository implements IFeedsRepository {
	findFeedByTitle: (title: string) => Promise<any> = async (
		title: string,
	) => {
		const feed = await FeedsModel.findOne({ title });

		return feed;
	};

	createFeed: (author: string, feedData: IFeeds) => Promise<any> = async (
		author: string,
		feedData: IFeeds,
	) => {
		console.info('Creating feed', author);
		const feed = await FeedsModel.create({ ...feedData, author });

		return feed;
	};

	findFeedById: (id: string) => Promise<any> = async (id: string) => {
		const feed = await FeedsModel.findById(id);

		return feed;
	};

	findFeeds: (limit: number, page: number) => Promise<any> = async (
		limit: number,
		page: number,
	) => {
		const feeds = await FeedsModel.find({})
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 });

		return feeds;
	};

	updateFeed: (id: string, feedData: IFeeds) => Promise<any> = async (
		id: string,
		feedData: IFeeds,
	) => {
		const feed = await FeedsModel.findByIdAndUpdate(id, feedData, {
			new: true,
		});

		return feed;
	};

	deleteFeed: (id: string) => Promise<any> = async (id: string) => {
		const feed = await FeedsModel.findByIdAndUpdate(
			id,
			{
				isDeleted: true,
			},
			{
				new: true,
			},
		);

		return feed;
	};

	findFollowedFeeds: (id: string) => Promise<any> = async (id: string) => {
		const followed = await userModel
			.findById(id)
			.populate('followings')
			.select('followings');
		const feeds = await FeedsModel.find({
			author: { $in: followed!.followings },
		});

		return feeds;
	};

	findFeedsByUser: (id: string, limit: number, page: number) => Promise<any> =
		async (id: string, limit: number, page: number) => {
			const feeds = await FeedsModel.find({ author: id })
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({ createdAt: -1 });

			return feeds;
		};

	findFeedsByTag: (tag: string, limit: number, page: number) => Promise<any> =
		async (tag: string, limit: number, page: number) => {
			const feeds = await FeedsModel.find({ tag: { $in: [tag] } })
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({ createdAt: -1 });

			return feeds;
		};

	search: (query: string, limit: number, page: number) => Promise<any> =
		async (query: string, limit: number, page: number) => {
			const feeds = await FeedsModel.find({
				$text: { $search: query },
				score: { $meta: 'textScore' },
			})
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({ createdAt: -1 });

			return feeds;
		};
}
