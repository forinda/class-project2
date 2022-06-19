/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@blog-api-databases/mongodb';

export interface IFeeds {
	author: any;
	title: string;
	exerpt: string;
	body: string;
	featuredImage: any;
	views: number;
	tags: any[];
	// isPublished: boolean;
	isDeleted: boolean;
}

export interface IFeedsDocument extends IFeeds, mongoose.Document {
	_doc: any; // mongoose.Document
}

export interface IFeedsModel extends mongoose.Model<IFeedsDocument> {
	findAll(): Promise<IFeedsDocument[]>;
}


