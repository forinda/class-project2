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

		body: {
			type: String,
			required: false,
		},
		media: {
			type: {
				asset_id: String,
				public_id: String,
				version: String,
				version_id: String,
				url: String,
			},
			required: false,
			default: {
				asset_id: '',
				public_id: '',
				version: '',
				version_id: '',
				url: '',
			},
		},
		views: {
			type: Number,
			default: 0,
			min: 0,
		},
		tags: {
			type: String,
			required: false,
			default: '',
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

feedsSchema.index({ tags: 'text', body: 'text' }, { unique: false });

const feedsModel: IFeedsModel = mongoose.model<IFeedsDocument, IFeedsModel>(
	'Feeds',
	feedsSchema,
);

export default feedsModel;
