/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '../models/interface';
import { IUserRepository } from '../interfaces';
import { Password } from '@blog-api-helpers/password';
import UserModel from '../models';

export class UserRepository implements IUserRepository {
	findUserByIdAndFollowings: (userId: string) => Promise<any>=async(userId: string) => {
		const user = await UserModel.findById(userId).populate('followings').populate('followers').select('+password +followings +followers');

		return user;
	};

	findUserFollowers: (
		userId: string,
		limit: number,
		page: number,
	) => Promise<any> = async (userId: string, limit: number, page: number) => {
			const followers = await UserModel.findById(userId)
				.populate('followers')
				.limit(limit)
				.skip(limit * (page-1));

			return followers!.followers;
		};

	findUserFollowings: (
		userId: string,
		limit: number,
		page: number,
	) => Promise<any> = async (
			userId: string,
			limit: number,
			page: number,
		) => {
			const followers = await UserModel.findById(userId)
				.populate('followings')
				.limit(limit)
				.skip(limit * (page-1));

			return followers!.followings;
		};

	create: (userData: IUser) => Promise<any> = async (userData: IUser) => {
		const user = await UserModel.create({
			...userData,
			password: Password.hashPassword(userData.password),
		});
		const userWithPassword = user.toObject();
		userWithPassword.password = undefined;

		return userWithPassword;
	};

	findUser: (query: string) => Promise<any> = async (query: string) => {
		// Perform full text search of user model and sort by text score
		return await UserModel.find(
			{ $text: { $search: query } },
			{ score: { $meta: 'textScore' } },
		).sort({
			score: { $meta: 'textScore' },
		});
	};

	findUsers: (limit: number, page: number) => Promise<any> = async (
		limit: number,
		page: number,
	) => {
		return UserModel.find({})
			.limit(limit)
			.skip((page -1)* limit);
	};

	findUserByEmail: (email: string) => Promise<any> = async (
		email: string,
	) => {
		return UserModel.findOne({ email });
	};

	findUserById: (userId: string) => Promise<any> = async (userId: string) => {
		return UserModel.findById(userId);
	};

	updateUserById: (userId: string, userData: Partial<IUser>) => Promise<any> =
		async (userId: string, userData: Partial<IUser>) => {
			return UserModel.findByIdAndUpdate(userId, userData, {
				new: true,
			});
		};

	deleteUser: (userId: string) => Promise<any> = async (userId: string) => {
		// Update user
		return UserModel.findByIdAndUpdate(
			userId,
			{
				isDeleted: true,
			},
			{
				new: true,
			},
		);
	};
}
