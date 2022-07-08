/* eslint-disable camelcase */
import mongoose from '@blog-api-databases/mongodb';
import { IConversationDocument, IConversationModel } from './interface';

const conversationSchema: mongoose.Schema<IConversationDocument> =
	new mongoose.Schema(
		{
			members: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: 'User',
				required: true,
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

const feedsModel: IConversationModel = mongoose.model<
	IConversationDocument,
	IConversationModel
>('Conversation', conversationSchema);

export default feedsModel;
