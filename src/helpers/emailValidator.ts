/* eslint-disable no-useless-escape */
export function validateEmail(email: string) {
	// Declare email regex
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	// Check if email is valid regex
	return emailRegex.test(String(email).toLowerCase());
}
