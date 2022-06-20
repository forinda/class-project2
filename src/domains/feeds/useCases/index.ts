/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogError } from '@blog-api-common/errors';
import { FeedsEntity } from '../entity';
import { FeedsRepository } from '../repository';
import { IReq } from '@blog-api-common/requests';
import { baseLogger } from '@blog-api-logger';
import streamUploader from '@blog-api-uploadSdk/streamUploader';
import { validateMongoId } from '@blog-api-helpers/validateMongoId';
import { IFeeds, IMedia } from '../models/interfaces';
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

	addFeed: (author: string, feedData: IFeeds, req: IReq) => Promise<any> =
		async (author: string, feedData: IFeeds, req: IReq) => {
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
			// Check if a file or a body
			// Check if there is media or body
			if (!feedData.body && !req.file) {
				throw new BlogError({
					message: 'Cannot create feed without body or media',
					status: 'warning',
					statusCode: 400,
					data: {},
				});
			}
			const {
				getAuthor,
				getBody,
				getTags,
				getViews,
				getIsDeleted,
				getMedia,
			} = FeedsEntity.createFeed(feedData);
			console.log(req.file);

			// Upload to cloudinary
			if (req.file) {
				try {
					const cloudResponse = <any>await streamUploader(req);
					const media: IMedia = {
						url: cloudResponse.secure_url,
						public_id: cloudResponse.public_id,
						version: cloudResponse.version,
						version_id: cloudResponse.version_id,
						asset_id: cloudResponse.asset_id,
					};

					const feed = await this.repository.createFeed(getAuthor(), {
						author: getAuthor(),
						body: getBody(),
						tags: getTags(),
						views: getViews(),
						isDeleted: getIsDeleted(),
						media: media,
					});

					return feed;
				} catch (error) {
					baseLogger.error(JSON.stringify(error));
					throw new Error(error);
				}
			}

			const feed = await this.repository.createFeed(getAuthor(), {
				author: getAuthor(),
				body: getBody(),
				tags: getTags(),
				views: getViews(),
				isDeleted: getIsDeleted(),
				media: getMedia(),
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
			getTags,
			getViews,
			getIsDeleted,
			getMedia,
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

		const updatedFeed = await this.repository.updateFeed(id, {
			author: getAuthor(),
			body: getBody(),
			tags: getTags(),
			views: getViews(),
			isDeleted: getIsDeleted(),
			media: getMedia(),
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
