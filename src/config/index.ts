import { nodeConfig } from '../node.config';

const {
	env: { env, host, port, apiVersion, secretKey },
	db: { mongo: mongoConfig },
	path: { baseDir },
	cloudinary: cloudinaryConfig,
	network: networkConfig,
} = nodeConfig;

export {
	env,
	host,
	port,
	mongoConfig,
	baseDir,
	apiVersion,
	secretKey,
	cloudinaryConfig,
	networkConfig,
};
