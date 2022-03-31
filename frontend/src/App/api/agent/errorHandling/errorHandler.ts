import { AxiosError } from 'axios';
import { notification } from 'antd';
import axios from 'axios';

export const errorHandler = async (error: AxiosError) => {
	const { status } = error.response || { status: null, data: null };

	let tokenRefreshedSuccessfully = false;

	switch (status) {
		case 400:
			return handleBadRequest(error);
		case 404:
			return handleNotFound(error);
		case 500:
			handleInternalServerError(error);
			break;
		default:
			break;
	}

	return tokenRefreshedSuccessfully ? axios.request(error.config) : Promise.reject(error);
};

function handleBadRequest(error: AxiosError<any>) {
	switch (error.config.url) {
		// dodać enpointy url dla których trzeba dodać obsługę
		default:
			return Promise.reject(error.response?.data);
	}
}

function handleInternalServerError(error: AxiosError<any>) {
	notification['error']({
		message: 'The app has encountered an error :(',
		description: 'Please wait and try again later'
	});
	console.log(`500:`, error.response && error.response.data.message);
}

function handleNotFound(error: AxiosError<any>) {
	notification.warn({
		message: "Server couldn't resolve given endpoint",
		description: `Server couldn resolve url:"${error.config.url}" `
	});
}
