import jwt from 'jsonwebtoken';
import { secretKey } from '@blog-api-config';

export type JwtPayload = {
	userId: string;
	email: string;
};

export class Jwt {
	public static generateToken(user: JwtPayload): string {
		return jwt.sign(user, secretKey, { expiresIn: '24h' });
	}

	public static verifyToken(token: string): JwtPayload {
		return jwt.verify(token, secretKey) as JwtPayload;
	}
}
