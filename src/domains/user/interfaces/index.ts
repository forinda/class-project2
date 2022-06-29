/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '../models/interface';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export interface IUserController {
	newUserController: (req: IReq, res: IRes, next: INext) => Promise<any>;
	updateUserController: (req: IReq, res: IRes, next: INext) => Promise<any>;
	deleteUserController: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getUserByIdController: (req: IReq, res: IRes, next: INext) => Promise<any>;
	searchUserController: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getUsersController: (req: IReq, res: IRes, next: INext) => Promise<any>;
	followUserController: (req: IReq, res: IRes, next: INext) => Promise<any>;
	unfollowUserController: (req: IReq, res: IRes, next: INext) => Promise<any>;
	getFollowersController: (req: IReq, res: IRes, next: INext) => Promise<any>;
	followingsController: (req: IReq, res: IRes, next: INext) => Promise<any>;
}

export interface IUserUseCases {
	addUserUseCase: (userData: IUser) => Promise<any>;
	editUserUseCase: (userId: string, userData: Partial<IUser>,req:IReq) => Promise<any>;
	deleteUserUseCase: (userId: string) => Promise<any>;
	listUserUseCase: (query: string) => Promise<any>;
	listUserByIdUseCase: (query: string) => Promise<any>;
	listUsersUseCase: (limit: number, page: number) => Promise<any>;
	followUserUseCase: (
		userId: string,
		userToFollowId: string,
	) => Promise<any>;
	unfollowUserUseCase: (
		userId: string,
		userToUnfollowId: string,
	) => Promise<any>;
	listUserFollowingsUseCase: (
		userId: string,
		limit: number,
		page: number,
	) => Promise<any>;
	listUserFollowersUseCase: (
		userId: string,
		limit: number,
		page: number,
	) => Promise<any>;
}

export interface IUserRepository {
	create: (userData: IUser) => Promise<any>;
	findUser: (query: string) => Promise<any>;
	findUsers: (limit: number, page: number) => Promise<any>;
	findUserByEmail: (email: string) => Promise<any>;
	findUserFollowers: (userId: string, limit: number, page: number) => Promise<any>;
	findUserFollowings: (userId: string, limit: number, page: number) => Promise<any>;
	findUserById: (userId: string) => Promise<any>;
	findUserByIdAndFollowings: (userId: string) => Promise<any>;
	updateUserById: (userId: string, userData: Partial<IUser>) => Promise<any>;
	deleteUser: (userId: string) => Promise<any>;
}
