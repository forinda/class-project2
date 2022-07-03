/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@blog-api-databases/mongodb';

// type likeType = 'post' | 'profile';

export interface ILike {
    author:any
    entity:any
}

export interface ILikeDocument extends ILike, mongoose.Document {
	_doc: any;
}

export interface ILikeDocumentModel extends mongoose.Model<ILikeDocument> {
	findByAuthor: (searchString: string) => Promise<any>;
}
