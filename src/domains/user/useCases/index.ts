/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogError } from '@blog-api-common/errors';
import { IUser } from '../models/interface';
import { IUserUseCases } from '../interfaces';
import { UserEntity } from './../entity';
import { UserRepository } from '../repository';
import { validateMongoId } from '@blog-api-helpers/validateMongoId';

export class UserUseCases implements IUserUseCases {
	private userRepository: UserRepository = new UserRepository();

	followUserUseCase: (
		userId: string,
		userToFollowId: string,
	) => Promise<any> = async (userId: string, userToFollowId: string) => {
			if (!validateMongoId(userToFollowId)) {
				throw new BlogError({
					message: 'Invalid user id',
					status: 'warning',
					statusCode: 400,
					data: {
						userToFollowId,
					},
				});
			}
			const existingUser =
			await this.userRepository.findUserByIdAndFollowings(userId);
			if (!existingUser) {
				throw new BlogError({
					message: 'User not found',
					status: 'warning',
					statusCode: 404,
					data: {},
				});
			}

			const userToFollow =
			await this.userRepository.findUserByIdAndFollowings(userToFollowId);
			if (!userToFollow) {
				throw new BlogError({
					message: 'You cannot follow non existing user',
					status: 'warning',
					statusCode: 404,
					data: {},
				});
			}
			// Update user to befollowed
			if (
				userToFollow.followers.find(
					(user: any) => user._id.toString() === userId,
				)
			) {
				throw new BlogError({
					message: 'You cannot follow user that you already follow',
					status: 'warning',
					statusCode: 400,
					data: {},
				});
			}
			await this.userRepository.updateUserById(userToFollowId, {
				email: userToFollow.email,
				followings: userToFollow.followings,
				password: userToFollow.password,
				username: userToFollow.username,
				followers: userToFollow.followers.concat(userId),
			});
			// Then update the user following

			if (
				existingUser.followings.find(
					(following: any) => following._id.toString() === userToFollowId,
				)
			) {
				throw new BlogError({
					message: 'You cannot follow user that you already follow',
					status: 'warning',
					statusCode: 400,
					data: {},
				});
			}
			await this.userRepository.updateUserById(userId, {
				email: existingUser.email,
				followers: existingUser.followers,
				isDeleted: existingUser.isDeleted,
				password: existingUser.password,
				username: existingUser.username,
				followings: existingUser.followings.concat(userToFollowId),
			});

			return { followed: true };
		};

	unfollowUserUseCase: (
		userId: string,
		userToUnfollowId: string,
	) => Promise<any> = async (userId: string, userToUnfollowId: string) => {
			if (!validateMongoId(userToUnfollowId)) {
				throw new BlogError({
					message: 'Invalid user id',
					status: 'warning',
					statusCode: 400,
					data: {
						userToUnfollowId,
					},
				});
			}
			const existingUser =
			await this.userRepository.findUserByIdAndFollowings(userId);
			if (!existingUser) {
				throw new BlogError({
					message: 'User not found',
					status: 'warning',
					statusCode: 404,
					data: {},
				});
			}
			const userToUnfollow =
			await this.userRepository.findUserByIdAndFollowings(
				userToUnfollowId,
			);
			if (!userToUnfollow) {
				throw new BlogError({
					message: 'You cannot unfollow non existing user',
					status: 'warning',
					statusCode: 404,
					data: {},
				});
			}
			// Update user to beunfollowed

			if (
				!userToUnfollow.followers.find(
					(user: any) => user._id.toString() === userId,
				)
			) {
				throw new BlogError({
					message: 'You cannot unfollow user that you do not follow',
					status: 'warning',
					statusCode: 400,
					data: {},
				});
			}
			await this.userRepository.updateUserById(userToUnfollowId, {
				...userToUnfollow._doc,
				followers: userToUnfollow.followers.filter(
					(user: any) => user._id.toString() !== userId,
				),
			});
			// Update the user following
			if (
				!existingUser.followings.find(
					(user: any) => user._id.toString() === userToUnfollowId,
				)
			) {
				throw new BlogError({
					message: 'You cannot unfollow user that you do not follow',
					status: 'warning',
					statusCode: 400,
					data: {},
				});
			}
			await this.userRepository.updateUserById(userId, {
				...existingUser._doc,
				followings: existingUser.followings.filter(
					(user: any) => user._id.toString() !== userToUnfollowId,
				),
			});

			return { unfollowed: true };
		};

	listUserFollowingsUseCase: (
		userId: string,
		limit: number,
		page: number,
	) => Promise<any> = async (userId: string, limit: number, page: number) => {
			const followings = await this.userRepository.findUserFollowings(
				userId,
				limit,
				page,
			);

			if (followings.length === 0) {
				throw new BlogError({
					message: 'You currently do not follow any user',
					status: 'warning',
					statusCode: 404,
					data: {},
				});
			}

			return followings;
		};

	listUserFollowersUseCase: (
		userId: string,
		limit: number,
		page: number,
	) => Promise<any> = async (userId: string, limit: number, page: number) => {
			const followers = await this.userRepository.findUserFollowers(
				userId,
				limit,
				page,
			);

			if (followers.length === 0) {
				throw new BlogError({
					message: 'You currently do not have any follower',
					status: 'warning',
					statusCode: 404,
					data: {},
				});
			}

			return followers;
		};

	addUserUseCase: (userData: IUser) => Promise<any> = async (
		userData: IUser,
	) => {
		const {
			getEmail,
			getIsDeleted,
			getPassword,
			getUserName,
			getAvatar,
			getCity,
			getCountry,
			getDOB,
			getFirstName,
			getGender,
			getLastName,
			getZip,
		} = UserEntity.createUserEntity(userData);
		const existing = await this.userRepository.findUserByEmail(getEmail());
		if (existing) {
			throw new BlogError({
				message: 'User already exists',
				status: 'warning',
				statusCode: 400,
				data: {
					email: getEmail(),
				},
			});
		}
		const user = await this.userRepository.create({
			email: getEmail(),
			password: getPassword(),
			username: getUserName(),
			isDeleted: getIsDeleted(),
			followers: [],
			followings: [],
			avatar: getAvatar(),
			city: getCity(),
			country: getCountry(),
			dob: getDOB(),
			firstName: getFirstName(),
			gender: getGender(),
			lastName: getLastName(),
			zip:getZip()
		});

		return user;
	};

	editUserUseCase: (
		userId: string,
		userData: Partial<IUser>,
	) => Promise<any> = async (userId: string, userData: Partial<IUser>) => {
			if (!userId) {
				throw new BlogError({
					message: 'User id is required',
					status: 'warning',
					statusCode: 400,
					data: {
						userId,
					},
				});
			}
			if (!validateMongoId(userId)) {
				throw new BlogError({
					message: 'User id is invalid',
					status: 'warning',
					statusCode: 400,
					data: {
						userId,
					},
				});
			}
			const existing = await this.userRepository.findUserById(userId);
			if (!existing) {
				throw new BlogError({
					message: 'User does not exist',
					status: 'warning',
					statusCode: 400,
					data: {
						userId,
					},
				});
			}
			const { getEmail, getIsDeleted, getPassword, getUserName,getAvatar,getCity,getCountry,getDOB,getFirstName,getGender,getLastName,getZip } =
			UserEntity.createUserEntity({
				...existing,
				...userData,
			});
			const user = await this.userRepository.updateUserById(userId, {
				email: getEmail(),
				password: getPassword(),
				username: getUserName(),
				isDeleted: getIsDeleted(),
				avatar: getAvatar(),
				city: getCity(),
				country: getCountry(),
				dob: getDOB(),
				firstName: getFirstName(),
				gender: getGender(),
				lastName: getLastName(),
				zip:getZip()
			});

			return user;
		};

	deleteUserUseCase: (userId: string) => Promise<any> = async (
		userId: string,
	) => {
		return await this.userRepository.deleteUser(userId);
	};

	listUserUseCase: (query: string) => Promise<any> = async (
		query: string,
	) => {
		return await this.userRepository.findUser(query);
	};

	listUserByIdUseCase: (id: string) => Promise<any> = async (
		query: string,
	) => {
		return await this.userRepository.findUserById(query);
	};

	listUsersUseCase: (limit: number, page: number) => Promise<any> = async (
		limit: number,
		page: number,
	) => {
		return await this.userRepository.findUsers(limit, page);
	};
}
