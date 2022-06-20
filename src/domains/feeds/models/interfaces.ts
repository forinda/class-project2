/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@blog-api-databases/mongodb';

export interface IFeeds {
	author: any;
	body: string;
	media?: IMedia;
	views: number;
	tags: string;
	// isPublished: boolean;
	isDeleted: boolean;
}

export interface IMedia {
	asset_id: string;
	public_id: string;
	version: string;
	version_id: string;
	url: string;
}

export interface IFeedsDocument extends IFeeds, mongoose.Document {
	_doc: any; // mongoose.Document
}

export interface IFeedsModel extends mongoose.Model<IFeedsDocument> {
	findAll(): Promise<IFeedsDocument[]>;
}
