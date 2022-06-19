/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAuthRepository } from '../interfaces';
import UserModel from '@blog-api-domains/user/models';

export class AuthRepository implements IAuthRepository {
	findUserByEmailOrUsername: (queryString: string) => Promise<any> = async (
		queryString: string,
	) => {
		const user = await UserModel.findOne({
			$or: [{ email: queryString }, { username: queryString }],
			$and: [{ isDeleted: { $ne: true } }],
		}).select('+password');

		return user;
	};
}
