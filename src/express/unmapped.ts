import express from 'express';
import { IReq, IRes } from '@blog-api-common/requests';

export default ({ app }: { app: express.Application }) => {
	app.all('*', (req: IReq, res: IRes) => {
		res.status(404).json({
			message: 'Not Found',
			url: req.originalUrl,
			params: req.params,
		});
	});
};
