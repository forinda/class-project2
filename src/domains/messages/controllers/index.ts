/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessageController, IMessageUseCase } from '../interfaces';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export class MessageController implements IMessageController {
	constructor(private useCase: IMessageUseCase) {}

	postnewMessage: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req, res, next) => {
			try {
				const response = this.useCase
			} catch (error) {
				return next(error);
			}
		};

	deleteMessage: (req: IReq, res: IRes, next: INext) => Promise<any> = async (
		req,
		res,
		next,
	) => {
		try {
		} catch (error) {
			return next(error);
		}
	};

	getMessagesByConversation: (
		req: IReq,
		res: IRes,
		next: INext,
	) => Promise<any> = async (req, res, next) => {
			try {
			} catch (error) {
				return next(error);
			}
		};
}
