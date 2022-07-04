/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeedsUseCases } from '../useCases';
import { IFeedsController, IFeedsUseCases } from '../interfaces';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export class FeedsController implements IFeedsController {
	private readonly useCases: IFeedsUseCases = new FeedsUseCases();

	getFeedsByTitle: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req, res, next) => {
			try {
				const result = await this.useCases.listFeedByTitle(req.params.title);

				return res.json(result);
			} catch (error) {
				return next(error);
			}
		};

	createFeed: (req: IReq, res: IRes, next: INext) => Promise<any> = async (
		req,
		res,
		next,
	) => {
		try {
			
			const response = await this.useCases.addFeed(
				req.user.userId,
				req.body,
				req,
			);

			res.status(201).json({ data: response });
		} catch (error) {
			return next(error);
		}
	};

	getFeed: (req: IReq, res: IRes, next: INext) => Promise<any> = async (
		req,
		res,
		next,
	) => {
		try {
			const response = await this.useCases.listFeed(req.params.id);

			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	};

	getFeeds: (req: IReq, res: IRes, next: INext) => Promise<any> = async (
		req,
		res,
		next,
	) => {
		try {
			const response = await this.useCases.listFeeds(
				req.query.limit ? <number>(<unknown>req.query.limit) : 10,
				req.query.page ? <number>(<unknown>req.query.page) : 1,
			);

			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	};

	updateFeed: (req: IReq, res: IRes, next: INext) => Promise<any> = async (
		req,
		res,
		next,
	) => {
		try {
			const response = await this.useCases.editFeed(
				req.params.id,
				req.body,
			);

			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	};

	deleteFeed: (req: IReq, res: IRes, next: INext) => Promise<any> = async (
		req,
		res,
		next,
	) => {
		try {
			const response = await this.useCases.deleteFeed(req.params.id);

			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	};

	getFollowedFeeds: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req, res, next) => {
			try {
				const response = await this.useCases.listFollowedFeeds(
					req.user.userId,
				);

				return res.status(200).json(response);
			} catch (error) {
				return next(error);
			}
		};

	getFeedsByUser: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req, res, next) => {
			try {
				const response = await this.useCases.listFeedsByUser(
					req.user.userId,
					req.query.limit ? <number>(<unknown>req.query.limit) : 10,
					req.query.page ? <number>(<unknown>req.query.page) : 1,
				);

				return res.status(200).json(response);
			} catch (error) {
				return next(error);
			}
		};

	getFeedsByTag: (req: IReq, res: IRes, next: INext) => Promise<any> = async (
		req,
		res,
		next,
	) => {
		try {
			const response = await this.useCases.listFeedsByTag(
				req.params.tag,
				req.query.limit ? <number>(<unknown>req.query.limit) : 10,
				req.query.page ? <number>(<unknown>req.query.page) : 1,
			);

			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	};

	search: (req: IReq, res: IRes, next: INext) => Promise<any> = async (
		req,
		res,
		next,
	) => {
		try {
			const response = await this.useCases.search(
				req.query.q ? <string>req.query.q : '',
				req.query.limit ? <number>(<unknown>req.query.limit) : 10,
				req.query.page ? <number>(<unknown>req.query.page) : 1,
			);

			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	};
}
