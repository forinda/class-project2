import mongoose from '@blog-api-databases/mongodb';
import { ILikeDocument, ILikeDocumentModel } from './interface';

const likeSchema: mongoose.Schema<ILikeDocument> = new mongoose.Schema(
	{
		author: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'User',
		},
		entity: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Feeds',
			rquired: true,
		},
	},
	{ timestamps: true },
);

likeSchema.statics.findByAuthor = async function (userId: string) {
	return this.find({ author: userId });
};

const likeModel = mongoose.model<ILikeDocument, ILikeDocumentModel>(
	'Like',
	likeSchema,
);

export default likeModel;
