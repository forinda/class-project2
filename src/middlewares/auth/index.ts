import { BlogError } from '@blog-api-common/errors';
import { JwtPayload } from '@blog-api-helpers/jwt';
import jwt from 'jsonwebtoken';
import { secretKey } from '@blog-api-config';
import { INext, IReq, IRes } from '@blog-api-common/requests';

class AuthMiddleware {
	public static loginRequired = async (req: IReq, res: IRes, next: INext) => {
		try {
			const authorization = req.headers.authorization;
			if (!authorization) {
				return next(
					new BlogError({
						message: 'Authorization header is required',
						status: 'error',
						statusCode: 401,
						data: {},
					}),
				);
			}
			const token = authorization.split(' ')[1];
			if (!token) {
				return next(
					new BlogError({
						message: 'Invalid access token',
						status: 'error',
						statusCode: 401,
						data: {},
					}),
				);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			jwt.verify(token, secretKey, (err: any, decoded: any) => {
				if (err) {
					return next(
						new BlogError({
							message: 'Invalid access token',
							status: 'error',
							statusCode: 401,
							data: {},
						}),
					);
				}
				req.user = decoded as JwtPayload;
				next();
			});
		} catch (err) {
			return next(err);
		}
	};
}

export const { loginRequired } = AuthMiddleware;
