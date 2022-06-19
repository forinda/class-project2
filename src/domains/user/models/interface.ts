/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@blog-api-databases/mongodb';

export interface IUser {
	email: string;
	username: string;
	password: string;
	isDeleted?: boolean;
	followings: any[];
	followers: any[];
}

export interface IUserDocument extends IUser,mongoose.Document {
	_doc: any;
}

export interface IUserDocumentModel extends mongoose.Model<IUserDocument> {
	findUserByEmailOrUsername: (searchString: string) => Promise<any>;
}
