import cors from 'cors';
import errorandler from './errorandler';
import express from 'express';
import helmet from 'helmet';
import unmapped from './unmapped';
import v1 from '@blog-api-api/v1';
import { apiVersion, host } from '@blog-api-config';
import { requestErrorLogger, requestLogger } from '@blog-api-logger';

/**
 * @Author: Felix Orinda
 * @Date:   June, 18th, 2022, 23:02:02
 * @Email: forinda82@gmail.com
 * @Last modified by:   Felix Orinda
 * @Last modified time: July, 18th, 2022, 23:02:02
 * @param {Application} app
 * @returns {void}
 * @description: This function is used to load all the application middlewares
 * @copyright: (c) 2022
 */
export default ({ app }: { app: express.Application }): void => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.set('trust proxy', 1);
	app.set('x-powered-by', false);
	app.set('etag', 'strong');
	app.set('strict routing', true);
	app.set('case sensitive routing', true);
	app.set('x-frame-options', 'SAMEORIGIN');
	app.set('x-xss-protection', '1; mode=block');
	app.set('x-content-type-options', 'nosniff');
	app.set('x-download-options', 'noopen');
	app.set('x-permitted-cross-domain-policies', 'none');
	app.set('x-dns-prefetch-control', 'off');
	app.set('x-download-options', 'noopen');
	app.set('host', host);
	// Helmet middleware
	app.use(helmet());
	// Cors
	app.use(cors({ origin: '*', credentials: true }));
	// Load app routes
	app.use(requestLogger);
	app.use(apiVersion, v1());
	// Unmapped routes
	unmapped({ app });
	// Request logger

	app.use(requestErrorLogger);
	app.use(errorandler);
};
