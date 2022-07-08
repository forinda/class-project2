/* eslint-disable @typescript-eslint/no-explicit-any */
import { IConversationController, IConversationUseCase } from '../interfaces';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export class ConversationController implements IConversationController {
	constructor(private useCase: IConversationUseCase) {}

	postNewConversation: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req, res, next) => {
			try {
				const response = await this.useCase.addConversation(
					req.body.sender,
					req.body.receiver,
				);

				return res.status(200).json(response);
			} catch (error) {
				return next(error);
			}
		};

	findAllUserConversations: (
		req: IReq,
		res: IRes,
		next: INext,
	) => Promise<any> = async (req, res, next) => {
			try {
				const response = await this.useCase.listUserConversations(
					req.user.userId,
				);

				return res.status(200).json(response);
			} catch (error) {
				return next(error);
			}
		};

	findConversation: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req, res, next) => {
			try {
				const response = await this.useCase.listConversation(
					req.user.userId,
					req.params.id
				);
	
				return res.status(200).json(response);
			} catch (error) {
				return next(error);
			}
		};
}
