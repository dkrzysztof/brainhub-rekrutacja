import { AxiosError } from 'axios';
import { notification } from 'antd';

import constructDefaultBadRequestNotification from './utils/badRequestNotification';

export const errorHandler = async (error: AxiosError) => {
  return new Promise((_, reject) => {
    const { status } = error.response || { status: null, data: null };

    switch (status) {
      case 400:
        handleBadRequest(error);
        reject(400);
        break;
      case 404:
        handleNotFound(error);
        reject(404);
        break;
      case 500:
        handleInternalServerError(error);
        reject(500);
        break;
      default:
        break;
    }
  });
};

function handleBadRequest(error: AxiosError<any>) {
  const data = error.response?.data;
  switch (error.config.url) {
    // dodać enpointy url, które trzeba będzie specjalnie obsłużyć
    default:
      constructDefaultBadRequestNotification(data);
      break;
  }
}

function handleInternalServerError(error: AxiosError<any>) {
  notification['error']({
    message: 'The app has encountered an error :(',
    description: 'Please wait and try again later',
  });
  console.log(`500:`, error.response && error.response.data.message);
}

function handleNotFound(error: AxiosError<any>) {
  notification.warn({
    message: "Server couldn't resolve given endpoint",
    description: `Server couldn resolve url:"${error.config.url}" `,
  });
}
