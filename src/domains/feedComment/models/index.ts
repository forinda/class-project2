import mongoose from '@blog-api-databases/mongodb';
import { IFeedCommentDocument, IFeedCommentModel } from './interface';

const feedCommentsSchema: mongoose.Schema<IFeedCommentDocument> =
	new mongoose.Schema({
		author: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'User',
		},
		post: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Feeds',
			required: true,
		},
		body: {
			type: String,
			required: true,
			min: 1,
			maxlength: 200,
		},
	});

const feedCommentModel = mongoose.model<
	IFeedCommentDocument,
	IFeedCommentModel
>('FeedComment', feedCommentsSchema);

export default feedCommentModel;
