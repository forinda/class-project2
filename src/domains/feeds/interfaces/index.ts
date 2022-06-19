/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFeeds } from '../models/interfaces';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export interface IFeedsController {
	createFeed: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getFeed: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getFeeds: (req: IReq, res: IRes, next: INext) => Promise<any>;
	updateFeed: (req: IReq, res: IRes, next: INext) => Promise<any>;
	deleteFeed: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getFollowedFeeds: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getFeedsByUser: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getFeedsByTitle: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getFeedsByTag: (req: IReq, res: IRes, next: INext) => Promise<any>;
    search: (req: IReq, res: IRes, next: INext) => Promise<any>;
}

export interface IFeedsUseCases {
	addFeed: (author: string, feedData: IFeeds) => Promise<any>;
	listFeed: (id: string) => Promise<any>;
	listFeedByTitle: (title: string) => Promise<any>;
	listFeeds: (limit: number, page: number) => Promise<any>;
	editFeed: (id: string, feedData: IFeeds) => Promise<any>;
	deleteFeed: (id: string) => Promise<any>;
	listFollowedFeeds: (id: string) => Promise<any>;
	listFeedsByUser: (id: string, limit: number, page: number) => Promise<any>;
	listFeedsByTag: (tag: string, limit: number, page: number) => Promise<any>;
    search: (query: string, limit: number, page: number) => Promise<any>;
}

export interface IFeedsRepository {
	createFeed: (author: string, feedData: IFeeds) => Promise<any>;
	findFeedById: (id: string) => Promise<any>;
	findFeedByTitle: (title: string) => Promise<any>;
	findFeeds: (limit: number, page: number) => Promise<any>;
	updateFeed: (id: string, feedData: IFeeds) => Promise<any>;
	deleteFeed: (id: string) => Promise<any>;
	findFollowedFeeds: (id: string) => Promise<any>;
	findFeedsByUser: (id: string, limit: number, page: number) => Promise<any>;
	findFeedsByTag: (tag: string, limit: number, page: number) => Promise<any>;
    search: (query: string, limit: number, page: number) => Promise<any>;
}
