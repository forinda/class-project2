import { Application } from 'express';
import loader from './express';
import moment from 'moment';
import { processLogger } from '@blog-api-logger';

/**
 * @Author: Felix Orinda
 * @Date:   June, 18th, 2022, 23:02:02
 * @Email: forinda82@gmail.com
 * @Last modified by:   Felix Orinda
 * @Last modified time: 2020-04-01T16:00:00+07:00
 * @param {Application} app
 * @returns {void}
 *m@description: This function is used to listen to the node process events
 */
export default ({ app }: { app: Application }): void => {
	// Process exception handlers
	process.on('uncaughtException', (err: Error) => {
		processLogger.info(
			JSON.stringify({
				time: moment().format('LLLL'),
				error: err.message,
			}),
		);
		// process.exit(1);
	});
	process.on('unhandledRejection', (err: Error) => {
		processLogger.info(
			JSON.stringify({
				time: moment().format('LLLL'),
				error: err.message,
				message: 'Uncaught Rejection... Shutting down node process',
			}),
		);
	});
	process.on('warning', (warning: Error) => {
		console.error(warning);
		processLogger.info(
			JSON.stringify({
				time: moment().format('LLLL'),
				error: warning.message,
				message: 'Warning... Shutting down node process',
			}),
		);
	});
	process.on('exit', (code: number) => {
		processLogger.warn(`About to exit with code: ${code}`);
		process.exit(1);
	});
	process.on('SIGINT', () => {
		processLogger.warn('Ctrl-C... Shutting down node process');
		process.exit(1);
	});
	process.on('SIGTERM', () => {
		processLogger.warn('SIGTERM... Shutting down node process');
		process.exit(1);
	});
	process.on('SIGUSR2', () => {
		processLogger.warn('SIGUSR2... Shutting down node process');
		process.exit(1);
	});
	process.on('SIGQUIT', () => {
		processLogger.warn('SIGQUIT... Shutting down node process');
		process.exit(1);
	});
	process.on('SIGABRT', () => {
		processLogger.warn('SIGABRT... Shutting down node process');
		process.exit(1);
	});
	// Load all the application middlewares
	loader({ app });
};
