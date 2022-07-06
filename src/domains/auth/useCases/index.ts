/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthRepository } from '../repository';
import { BlogError } from '@blog-api-common/errors';
import { Jwt } from '@blog-api-helpers/jwt';
import { Password } from '@blog-api-helpers/password';
import { IAuthRepository, IAuthUseCases } from '../interfaces';

export class AuthUseCases implements IAuthUseCases {
	private _authRepository: IAuthRepository = new AuthRepository();

	get authRepository(): IAuthRepository {
		return this._authRepository;
	}

	signIn = async (username: string, password: string): Promise<any> => {
		if (!username || !password) {
			throw new BlogError({
				message: 'Invalid login credentials',
				status: 'warning',
				statusCode: 400,
				data: {
					username,
				},
			});
		}
		const user = await this.authRepository.findUserByEmailOrUsername(
			username,
		);

		if (!user) {
			throw new BlogError({
				message: 'User Account does not exist',
				status: 'warning',
				statusCode: 404,
				data: {},
			});
		}
		if (!Password.comparePassword(password, user.password)) {
			throw new BlogError({
				message: 'Invalid password or username or email',
				status: 'warning',
				statusCode: 400,
				data: {},
			});
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _pass,avatar:av, ...props } = user._doc;
		const accessToken = Jwt.generateToken({
			userId: props._id,
			email: props.email,
		});

		return { user: {...props,avatar:av.url}, accessToken };
	};
}
