/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@blog-api-databases/mongodb';

export interface IUser {
	email: string;
	username: string;
	password: string;
	firstName?:string
	lastName?:string
	dob?:string
	gender?:'male'|'female'|'other'
	city?:string
	zip?:string
	country?:string
	isDeleted?: boolean;
	avatar:IMedia
	followings: any[];
	followers: any[];
}

export interface IMedia {
	asset_id: string;
	public_id: string;
	version: string;
	version_id: string;
	url: string;
}

export interface IUserDocument extends IUser,mongoose.Document {
	_doc: any;
}

export interface IUserDocumentModel extends mongoose.Model<IUserDocument> {
	findUserByEmailOrUsername: (searchString: string) => Promise<any>;
}
