/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogError } from '@blog-api-common/errors';
import { FeedsEntity } from '../entity';
import { FeedsRepository } from '../repository';
import { IFeeds } from '../models/interfaces';
import { validateMongoId } from '@blog-api-helpers/validateMongoId';
import { IFeedsRepository, IFeedsUseCases } from '../interfaces';

export class FeedsUseCases implements IFeedsUseCases {
	private repository: IFeedsRepository = new FeedsRepository();

	listFeedByTitle: (title: string) => Promise<any> = async (
		title: string,
	) => {
		if (!title) {
			throw new BlogError({
				message: 'Title is required',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
	};

	addFeed: (author: string, feedData: IFeeds) => Promise<any> = async (
		author: string,
		feedData: IFeeds,
	) => {
		if (!author) {
			throw new BlogError({
				message: 'Author is required',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		if (!validateMongoId(author)) {
			throw new BlogError({
				message: 'Author is not valid',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		feedData.author = author;
		const {
			getAuthor,
			getBody,
			getExerpt,
			getFeaturedImage,
			getTags,
			getTitle,
			getViews,
			getIsDeleted,
		} = FeedsEntity.createFeed(feedData);

		const existing = await this.repository.findFeedByTitle(getTitle());
		if (existing) {
			throw new BlogError({
				message: 'Feed title already exists',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		console.log('Author: ', getAuthor());

		const feed = await this.repository.createFeed(getAuthor(), {
			author: getAuthor(),
			body: getBody(),
			exerpt: getExerpt(),
			featuredImage: getFeaturedImage(),
			tags: getTags(),
			title: getTitle(),
			views: getViews(),
			isDeleted: getIsDeleted(),
		});

		return feed;
	};

	listFeed: (id: string) => Promise<any> = async (id: string) => {
		const feed = await this.repository.findFeedById(id);

		if (!feed) {
			throw new BlogError({
				message: 'Feed not found',
				status: 'warning',
				statusCode: 404,
				data: {},
			});
		}

		return feed;
	};

	listFeeds: (limit: number, page: number) => Promise<any> = async (
		limit: number,
		page: number,
	) => {
		const feeds = await this.repository.findFeeds(limit, page);
		if (feeds.length === 0) {
			throw new BlogError({
				message: 'Feeds not found',
				status: 'warning',
				statusCode: 404,
				data: {},
			});
		}

		return feeds;
	};

	editFeed: (id: string, feedData: IFeeds) => Promise<any> = async (
		id: string,
		feedData: IFeeds,
	) => {
		if (!validateMongoId(id)) {
			throw new BlogError({
				message: 'Feed id is not valid',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		const {
			getAuthor,
			getBody,
			getExerpt,
			getFeaturedImage,
			getTags,
			getTitle,
			getViews,
			getIsDeleted,
		} = FeedsEntity.createFeed(feedData);

		const feed = await this.repository.findFeedById(id);
		if (!feed) {
			throw new BlogError({
				message: 'Feed not found',
				status: 'warning',
				statusCode: 404,
				data: {},
			});
		}
		const existing = await this.repository.findFeedByTitle(getTitle());
		if (existing && existing._id !== id) {
			throw new BlogError({
				message: 'Feed title already exists',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		const updatedFeed = await this.repository.updateFeed(id, {
			author: getAuthor(),
			body: getBody(),
			exerpt: getExerpt(),
			featuredImage: getFeaturedImage(),
			tags: getTags(),
			title: getTitle(),
			views: getViews(),
			isDeleted: getIsDeleted(),
		});

		return updatedFeed;
	};

	deleteFeed: (id: string) => Promise<any> = async (id: string) => {
		const feed = await this.repository.deleteFeed(id);

		return feed;
	};

	listFollowedFeeds: (id: string) => Promise<any> = async (id: string) => {
		const feeds = await this.repository.findFollowedFeeds(id);

		return feeds;
	};

	listFeedsByUser: (id: string, limit: number, page: number) => Promise<any> =
		async (id: string, limit: number, page: number) => {
			const feeds = await this.repository.findFeedsByUser(
				id,
				limit,
				page,
			);

			return feeds;
		};

	listFeedsByTag: (tag: string, limit: number, page: number) => Promise<any> =
		async (tag: string, limit: number, page: number) => {
			const feeds = await this.repository.findFeedsByTag(
				tag,
				limit,
				page,
			);

			return feeds;
		};

	search: (query: string, limit: number, page: number) => Promise<any> =
		async (query: string, limit: number, page: number) => {
			const feeds = await this.repository.search(query, limit, page);

			return feeds;
		};
}
