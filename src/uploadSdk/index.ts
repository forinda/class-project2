/* eslint-disable camelcase */
import { cloudinaryConfig } from '@blog-api-config';
import { v2 } from 'cloudinary';

v2.config({
	cloud_name: cloudinaryConfig.cloudName,
	api_key: cloudinaryConfig.apiKey,
	api_secret: cloudinaryConfig.apiSecret,
});

export default v2;
