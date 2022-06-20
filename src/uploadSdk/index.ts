/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig, networkConfig } from '@blog-api-config';

cloudinary.config({
	cloud_name: cloudinaryConfig.cloudName,
	api_key: cloudinaryConfig.apiKey,
	api_secret: cloudinaryConfig.apiSecret,
	api_proxy: networkConfig.proxy,
});

export default cloudinary;
