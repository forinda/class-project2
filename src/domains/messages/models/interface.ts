/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@blog-api-databases/mongodb';

export interface IMessage {
   sender:any,
	text:string,
	conversation:any,
	isDeleted?:boolean
}

export interface IMessageDocument extends IMessage, mongoose.Document {
	_doc: any;
}

export interface IMessageModel extends mongoose.Model<IMessageDocument> {
	findConversationByMembers: (member1: string, member2:string) => Promise<any>;
}
