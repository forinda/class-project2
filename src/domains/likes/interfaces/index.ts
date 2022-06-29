/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILike } from '../models/interface';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export interface ILikeController {
	likePost: (req: IReq, res: IRes, next: INext) => Promise<any>;
}

export interface ILikeUseCase {
	addLike: (like: ILike) => Promise<any>;
}

export interface ILikeRepository {
	createLike: (like: ILike) => Promise<any>;
}
