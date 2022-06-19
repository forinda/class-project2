import { baseDir } from '@blog-api-config';
import express from 'express';
import path from 'path';

export default async ({ app }: { app: express.Router }) => {
	const swaggerUi = (await import('swagger-ui-express')).default;
	const yaml = (await import('yamljs')).default;
	// Swagger docs
	const swaggerDocs = yaml.load(
		path.join(baseDir, 'src', 'api-specs', 'specs.yml'),
	);
	const options = {
		explorer: true,
		// customCss: '.swagger-ui .topbar { display: none; }',
		title: 'Blog API',
	};
	app.use(
		'/api-docs',
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocs, options),
	);
};
