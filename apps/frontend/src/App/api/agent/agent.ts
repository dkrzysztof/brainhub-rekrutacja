import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { baseURL } from './axios/configuration';
import EventsApi from '../endpoints/events';

axios.defaults.baseURL = baseURL;

const responseBodyAxios = (response: AxiosResponse) => {
  if (
    response?.data &&
    'data' in response.data &&
    Object.keys(response.data).length === 1
  ) {
    return response.data.data;
  }

  return response.data;
};

export const defaultHeaders = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json;charset=utf-8',
};

export const requests = {
  get: (url: string, params?: {}) =>
    axios
      .get(url, {
        params,
      })
      .then(responseBodyAxios),
  post: (url: string, body: {}, config?: AxiosRequestConfig | undefined) =>
    axios.post(url, body, config).then(responseBodyAxios),
};

const agent = {
  Events: EventsApi,
};

export default agent;
