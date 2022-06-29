/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from '@blog-api-databases/mongodb';
import { IUserDocument, IUserDocumentModel } from './interface';

const userSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true,
			index: true,
		},
		email: {
			required: [true, 'Email is required'],
			type: String,
			unique: true,
			index: true,
		},
		password: {
			required: true,
			type: String,
			minlength: 8,
			select: false,
		},
		isDeleted: {
			type: Boolean,
			default: false,
			select: false,
		},
		followings: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: 'User',
			default: [],
			select: false,
		},
		followers: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: 'User',
			default: [],
			select: false,
		},
		avatar: {
			type: {
				asset_id: String,
				public_id: String,
				url: String,
				version: String,
				version_id: String,
			},
			default: {
				asset_id: '',
				public_id: '',
				url: '',
				version: '',
				version_id: '',
			},
		},
		city: {
			type: String,
			default: '',
		},
		country: {
			type: String,
			default: '',
		},
		dob: {
			type: Date,
			default: Date.now(),
		},
		firstName: {
			type: String,
			default: '',
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'other'],
			default: 'other',
		},
		lastName: {
			type: String,
			default: '',
		},
		zip: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
	},
);
userSchema.index({ username: 'text', email: 'text' }, { unique: false });
userSchema.statics.findUserByEmailOrUsername = async function (
	inputString: string,
) {
	const user = await this.findOne({
		$or: [{ email: inputString }, { username: inputString }],
	});

	return user;
};

const userModel = mongoose.model<IUserDocument, IUserDocumentModel>(
	'User',
	userSchema,
);

export default userModel;
