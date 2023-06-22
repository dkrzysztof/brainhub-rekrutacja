import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import EventsApi from '../endpoints/events';

import { baseURL } from './axios/configuration';

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
  get: (url: string, params?: AxiosRequestConfig['params']) =>
    axios
      .get(url, {
        params,
      })
      .then(responseBodyAxios),
  post: (url: string, body: any, config?: AxiosRequestConfig | undefined) =>
    axios.post(url, body, config).then(responseBodyAxios),
};

const agent = {
  Events: EventsApi,
};

export default agent;
