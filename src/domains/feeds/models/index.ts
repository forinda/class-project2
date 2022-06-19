/* eslint-disable camelcase */
import mongoose from '@blog-api-databases/mongodb';
import { IFeedsDocument, IFeedsModel } from './interfaces';

const feedsSchema: mongoose.Schema<IFeedsDocument> = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
			unique: true,
		},
		exerpt: {
			type: String,
			maxlength: 200,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		featuredImage: {
			type: {
				url: String,
				public_id: String,
				defaultUrl: String,
			},
			required: false,
			default: {
				url: '',
				public_id: '',
				defaultUrl:'https://res.cloudinary.com/forinda/image/upload/v1641375402/sample.jpg'
			},
		},
		views: {
			type: Number,
			default: 0,
			min: 0,
		},
		tags: {
			type: [String],
			required: false,
			default: [],
		},
		isDeleted: {
			type: Boolean,
			default: false,
			select: false,
		},
	},
	{
		timestamps: true,
	},
);

feedsSchema.index(
	{ title: 'text', exerpt: 'text', body: 'text' },
	{ unique: false },
);

const feedsModel: IFeedsModel = mongoose.model<IFeedsDocument, IFeedsModel>(
	'Feeds',
	feedsSchema,
);

export default feedsModel;
