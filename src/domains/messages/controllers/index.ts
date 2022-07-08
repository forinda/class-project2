/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILikeController, ILikeUseCase } from '../interfaces';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export class LikeController implements ILikeController {
	constructor(private useCase: ILikeUseCase) {}

	likePost: (req: IReq, res: IRes, next: INext) => Promise<any> =async (
		req,
		res,
		next,
	) => {
		try {
			const response = await this.useCase.addLike({
				author: req.user.userId,
				entity: req.params.id,
			});

			return res.status(200).json(response);
		} catch (error) {
			return next(error);
		}
	};
}
