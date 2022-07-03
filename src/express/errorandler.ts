/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlogError } from '@blog-api-common/errors';
import { baseLogger } from '@blog-api-logger';
import { capitalize } from 'string-shuffle';
import { INext, IReq, IRes } from '@blog-api-common/requests';

export default (err: any, req: IReq, res: IRes, next: INext) => {
	// Compare instance of two objsects
	if (err instanceof BlogError) {
		return res.status(err.statusCode).json({
			...err.toJson(),
		});
	}

	if (err.name === 'ValidationError') {
		const error: string[] = [];
		for (const key of Object.keys(err['errors']))
			error.push(`${capitalize(key)} field is required`);

		return res.status(400).json({
			data: {
				error,
			},
			status: 'error',
			message: 'Invalid inputs',
		});
	}
	if (err.code === 11000) {
		let error = '';
		const x: { [x: string]: any } = err['keyValue'];
		for (const key of Object.keys(x))
			error += `${capitalize(key)} ${x[key]} already exists`;

		return res.status(409).json({
			status: 'error',
			message: 'Duplicate entry',
			data: { error },
		});
	}
	baseLogger.error(JSON.stringify(err));

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error',
		data: {}
	});
};
