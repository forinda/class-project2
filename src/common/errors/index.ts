/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	IBlogError,
	responseStatusCodeWithMessage,
	responseStatusCodeWithMessageAndData,
	responseStatusCodeWithMessageAndStatus,
	responseStatusWithStatusCode,
	statusCodeType,
	statusType,
} from './index.d';

export class BlogError extends Error implements IBlogError {
	status: statusType;

	statusCode: statusCodeType;

	data: any;

	constructor({
		message,
		status,
		statusCode,
		data,
	}: {
		message: string;
		status: statusType;
		statusCode: statusCodeType;
		data?: any;
	}) {
		super(message);
		this.name = 'BlogError';
		this.data = data;
		this.status = status;
		this.statusCode = statusCode;
	}

	toJson() {
		return {
			statusCode: this.statusCode,
			status: this.status,
			message: this.message,
		};
	}
}

class ResponseFormatter {
	ResponseWithStatusCode: responseStatusWithStatusCode = (
		statusCode: statusCodeType,
	) => {
		return statusCode;
	};

	ResponseWithStatusCodeAndMessage: responseStatusCodeWithMessage = (
		statusCode: statusCodeType,
		status: statusType,
		data: any,
		message: string,
	) => {
		return {
			message,
			statusCode,
		};
	};

	ResponseWithCodeMessageAndStatus: responseStatusCodeWithMessageAndStatus = (
		statusCode: statusCodeType,
		status: statusType,
		message: string,
		data: any,
	) => {
		return {
			message,
			statusCode,
			status,
		};
	};

	ResponseWithData: responseStatusCodeWithMessageAndData = (
		statusCode: statusCodeType,
		status: statusType,
		message: string,
		data: any,
	) => {
		return {
			message,
			statusCode,
			status,
			data,
		};
	};
}

export const {
	ResponseWithCodeMessageAndStatus,
	ResponseWithData,
	ResponseWithStatusCode,
	ResponseWithStatusCodeAndMessage,
} = new ResponseFormatter();
