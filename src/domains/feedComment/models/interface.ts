/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@blog-api-databases/mongodb';

export interface IFeedComment {
	author: any;
	post: any;
	body: string;
}

export interface IFeedCommentDocument extends mongoose.Document, IFeedComment {
	_doc: any;
}

export interface IFeedCommentModel
	extends mongoose.Model<IFeedCommentDocument> {
	findByAuthor: (authorId: string) => Promise<any>;
	findBlogComments: (blogId: string) => Promise<any>;
}
