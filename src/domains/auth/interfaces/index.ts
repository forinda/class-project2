/* eslint-disable @typescript-eslint/no-explicit-any */
import { INext,IReq,IRes } from '@blog-api-common/requests';

export interface IAuthUseCases {
	signIn: (username: string, password: string) => Promise<any>;
}

export interface IAuthRepository {
	findUserByEmailOrUsername: (queryString: string) => Promise<any>;
}

export interface IAuthController {
	signIn: (req: IReq, res: IRes, next: INext) => Promise<any>;
}
