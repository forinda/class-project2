import dotenv from 'dotenv';

dotenv.config();

export const nodeConfig = {
	env: {
		env: process.env.NODE_ENV || 'development',
		port: process.env.PORT || 8000,
		host: process.env.HOST || 'localhost',
		apiVersion: process.env.API_VERSION || '/api/v1',
		secretKey: process.env.SECRET_KEY || 'mysecretkeythatisnotpublic',
	},
	path: {
		baseDir: process.cwd(),
	},
	db: {
		sql: {
			host: process.env.DB_HOST || 'localhost',
			port: process.env.DB_PORT || 27017,
			name: process.env.DB_NAME || 'node-api-boilerplate',
			user: process.env.DB_USER || '',
			password: process.env.DB_PASSWORD || '',
		},
		mongo: {
			mongoUrl:
				process.env.MONGO_URL ||
				'mongodb://localhost:27017/node-api-boilerplate',
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			},
		},
	},
	cloudinary: {
		cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
		apiKey: process.env.CLOUDINARY_API_KEY || '',
		apiSecret: process.env.CLOUDINARY_API_SECRET || '',
	},
	meta: {
		title: process.env.META_TITLE || 'Node API Boilerplate',
		description: process.env.META_DESCRIPTION || 'Node API Boilerplate',
		keywords: process.env.META_KEYWORDS || 'Node API Boilerplate',
	},
	rabbitmq: {
		url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
	},
	redis: {
		host: process.env.REDIS_HOST || 'localhost',
		port: process.env.REDIS_PORT || 6379,
		password: process.env.REDIS_PASSWORD || '',
		url: process.env.REDIS_URL || '',
	},
	network: {
		proxy: process.env.PROXY_URL || '',
	},
};
