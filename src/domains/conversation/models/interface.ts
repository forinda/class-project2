/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@blog-api-databases/mongodb';

// type likeType = 'post' | 'profile';

export interface IConversation {
    members:any[],
	isDeleted?:boolean
}

export interface IConversationDocument extends IConversation, mongoose.Document {
	_doc: any;
}

export interface IConversationModel extends mongoose.Model<IConversationDocument> {
	findConversationByMembers: (member1: string, member2:string) => Promise<any>;
}
