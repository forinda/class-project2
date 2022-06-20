/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IReq } from '@blog-api-common/requests';
import cloudinary from '.';
import streamifier from 'streamifier';

// Upload for our media stream
const streamUpload = (req: IReq) => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{ format: 'webp'},
			(error:any, result:any) => {
				if (result) resolve(result);
				else reject(error);
			},
		);
		streamifier.createReadStream(req.file!.buffer).pipe(stream);
	});
};

async function streamUploader(req: IReq) {
	const result = await streamUpload(req);

	return result;
}

export default streamUploader;
