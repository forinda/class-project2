import { Types } from 'mongoose';

// Declare a function to vaidate a MongoDB ID
export function validateMongoId(objectId: string) {
	if (Types.ObjectId.isValid(objectId))
		return String(new Types.ObjectId(objectId)) === objectId ? true : false;

	return false;
}
