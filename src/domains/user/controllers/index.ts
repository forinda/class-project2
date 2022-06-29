/* eslint-disable @typescript-eslint/no-explicit-any */
import { INext, IReq, IRes } from '@blog-api-common/requests';
import { IUserController, IUserUseCases } from '../interfaces';

export class UserController implements IUserController {
	constructor(private useCase: IUserUseCases) {}

	followUserController: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req: IReq, res: IRes, next: INext) => {
			try {
				const response = await this.useCase.followUserUseCase(
					req.user.userId,
					req.params.id,
				);
				res.status(200).json({ data: response });
			} catch (err) {
				return next(err);
			}
		};

	unfollowUserController: (
		req: IReq,
		res: IRes,
		next: INext,
	) => Promise<any> = async (req: IReq, res: IRes, next: INext) => {
			try {
				const response = await this.useCase.unfollowUserUseCase(
					req.user.userId,
					req.params.id,
				);
				res.status(200).json({ data: response });
			} catch (err) {
				return next(err);
			}
		};

	getFollowersController: (
		req: IReq,
		res: IRes,
		next: INext,
	) => Promise<any> = async (req: IReq, res: IRes, next: INext) => {
			try {
				const response = await this.useCase.listUserFollowersUseCase(
					req.user.userId,
					req.query.limit
						? <number><unknown>(<string>(<unknown>req.query.limit))
						: 10,
					req.query.page? <number><unknown>(<string>(<unknown>req.query.page)) : 1,
				);
				res.status(200).json({ data: response });
			} catch (err) {
				return next(err);
			}
		};

	followingsController: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req: IReq, res: IRes, next: INext) => {
			try {
				const response = await this.useCase.listUserFollowingsUseCase(
					req.user.userId,
					req.query.limit
						? <number><unknown>(<string>(<unknown>req.query.limit))
						: 10,
					req.query.page? <number><unknown>(<string>(<unknown>req.query.page)) : 1,
				);
				res.status(200).json({ data: response });
			} catch (err) {
				return next(err);
			}
		};

	/**
	 *
	 * @param req Request object
	 * @param res Response object
	 * @param next NexTick method
	 * @returns {any} object
	 * @description Controller for creating new user,
	 * Takes in user object and does validation of the inputs
	 */
	newUserController: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req: IReq, res: IRes, next: INext): Promise<any> => {
			try {
				const response = await this.useCase.addUserUseCase(req.body);

				return res.status(200).json({ data: response });
			} catch (error) {
				return next(error);
			}
		};

	updateUserController: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req: IReq, res: IRes, next: INext) => {
			try {
				const response = await this.useCase.editUserUseCase(
					req.params.id,
					req.body,
					req
				);

				return res.status(200).json({ data: response });
			} catch (error) {
				return next(error);
			}
		};

	deleteUserController: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req: IReq, res: IRes, next: INext) => {
			try {
				const response = await this.useCase.deleteUserUseCase(
					req.params.id,
				);

				return res.status(200).json({ data: response });
			} catch (error) {
				return next(error);
			}
		};

	getUserByIdController: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req: IReq, res: IRes, next: INext) => {
			try {
				const response = await this.useCase.listUserByIdUseCase(
					req.params.id,
				);

				return res.status(200).json({ data: response });
			} catch (error) {
				return next(error);
			}
		};

	getUsersController: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req: IReq, res: IRes, next: INext) => {
			try {
				const response = await this.useCase.listUsersUseCase(
					req.query.limit
						? <number>(
								(<unknown>(<string>(<unknown>req.query.limit)))
						)
						: 10,
					req.query.page
						? <number>(<unknown>(<string>(<unknown>req.query.page)))
						: 1,
				);

				return res.status(200).json({ data: response });
			} catch (error) {
				return next(error);
			}
		};

	searchUserController: (req: IReq, res: IRes, next: INext) => Promise<any> =
		async (req: IReq, res: IRes, next: INext) => {
			try {
				const response = await this.useCase.listUserUseCase(
					req.query.q
						? <string>(<unknown>(<string>(<unknown>req.query.q)))
						: '',
				);

				return res.status(200).json({ data: response });
			} catch (error) {
				return next(error);
			}
		};
}
