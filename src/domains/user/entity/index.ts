import { BlogError } from '@blog-api-common/errors';
import { IUser } from '../models/interface';
import { validateEmail } from '@blog-api-helpers/emailValidator';
import { validateUserPassword } from '../utils/validateUserPassword';

export class UserEntity {
	static createUserEntity = ({
		email,
		password,
		username,
		isDeleted,
		followers,
		followings,
		avatar,
		city,
		country,
		dob,
		firstName,
		gender,
		lastName,
		zip,
	}: IUser) => {
		if (!email) {
			throw new BlogError({
				message: 'Email is required',
				status: 'warning',
				statusCode: 400,
				data: { email },
			});
		}
		// Check if email is valid regex
		if (!validateEmail(email)) {
			throw new BlogError({
				message: 'Email is invalid',
				status: 'warning',
				statusCode: 400,
				data: { email },
			});
		}
		if (!password) {
			throw new BlogError({
				message: 'Password is required',
				status: 'warning',
				statusCode: 400,
				data: {
					password,
				},
			});
		}
		// Check if password is valid regex
		if (!validateUserPassword(password)) {
			throw new BlogError({
				message:
					'Password must be at least 8 characters, at least one number, one special character and one letter',
				status: 'warning',
				statusCode: 400,
				data: {
					password,
				},
			});
		}
		if (!username) {
			throw new BlogError({
				message: 'Username is required',
				status: 'warning',
				statusCode: 400,
				data: {
					username,
				},
			});
		}

		return Object.freeze({
			getUserName: () => username,
			getPassword: () => password,
			getEmail: () => email,
			getIsDeleted: () => isDeleted,
			getFollowers: () => followers,
			getFollowings: () => followings,
			getAvatar: () => avatar,
			getCity: () => city,
			getCountry: () => country,
			getDOB: () => dob,
			getFirstName: () => firstName,
			getGender: () => gender,
			getLastName: () => lastName,
			getZip: () => zip,
		});
	};
}
