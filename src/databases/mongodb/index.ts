import { dbLogger } from '@blog-api-logger';
import moment from 'moment';
import { mongoConfig } from '@blog-api-config';
import mongoose from 'mongoose';

mongoose.connect(mongoConfig.mongoUrl);

mongoose.connection.on('connected', () => {
	dbLogger.info(
		JSON.stringify({
			message: 'MongoDB connected',
			time: moment().format('LLLL'),
		}),
	);
});
mongoose.connection.on('error', (err) => {
	dbLogger.error(
		JSON.stringify({ time: moment().format('LLLL'), error: err.message }),
	);
});

mongoose.connection.on('disconnected', () => {
	dbLogger.error(
		JSON.stringify({
			time: moment().format('LLLL'),
			message: 'MongoDB disconnected',
		}),
	);
});
mongoose.connection.on('reconnected', () => {
	dbLogger.error(
		JSON.stringify({
			time: moment().format('LLLL'),
			message: 'MongoDB reconnected',
		}),
	);
});

export default mongoose;
