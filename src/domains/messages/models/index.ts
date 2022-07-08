/* eslint-disable camelcase */
import mongoose from '@blog-api-databases/mongodb';
import { IMessageDocument, IMessageModel } from './interface';

const conversationSchema: mongoose.Schema<IMessageDocument> =
	new mongoose.Schema(
		{
			sender: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},

			isDeleted: {
				type: Boolean,
				default: false,
				select: false,
			},
			conversation: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Conversation',
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
		},
		{
			timestamps: true,
		},
	);

const feedsModel: IMessageModel = mongoose.model<
	IMessageDocument,
	IMessageModel
>('Message', conversationSchema);

export default feedsModel;
