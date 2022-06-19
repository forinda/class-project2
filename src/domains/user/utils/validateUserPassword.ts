// Declare a function to validate user password for 8 characters, at least one number, one special character and one letter
export function validateUserPassword(password: string) {
	// Declare password regex
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	// Check if password is valid regex
	return passwordRegex.test(String(password));
}
