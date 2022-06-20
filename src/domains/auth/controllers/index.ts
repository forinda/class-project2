/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthUseCases } from '../useCases';
import { IAuthController, IAuthUseCases } from '../interfaces';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export class AuthController implements IAuthController {
	private readonly _authUseCases: IAuthUseCases = new AuthUseCases();

	get authUseCases(): IAuthUseCases {
		return this._authUseCases;
	}

	signIn: (req: IReq, res: IRes, next: INext) => Promise<any> = async (
		req: IReq,
		res: IRes,
		next: INext,
	) => {
		try {
			const response = await this.authUseCases.signIn(
				req.body.username,
				req.body.password,
			);
			res.status(200).json({ data: response });
		} catch (err) {
			return next(err);
		}
	};
}
