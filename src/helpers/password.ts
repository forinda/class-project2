import bcrypt from 'bcryptjs';

export class Password {
	static hashPassword(password: string): string {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	}

	static comparePassword(password: string, hash: string): boolean {
		return bcrypt.compareSync(password, hash);
	}
}
