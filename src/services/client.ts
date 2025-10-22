import axios, {AxiosError, AxiosResponse} from 'axios';

import {I18nManager} from 'react-native';
import i18next from 'i18next';
import {store} from '../store';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/upcoming',
  // baseURL: 'http://127.0.0.1:3005/',
  responseType: 'json',
  // timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async function (config) {
  // Add language header
  // const language = 'en';

  // console.log('language', language, i18next.language);
  // config.headers['x-user-language'] = i18next.language;

  // console.log(
  //   'apiConfig',
  //   `${config?.baseURL}${config.url}`,
  //   config?.params ? config?.params : config?.data,
  //   userInfo?.user?.token,
  // );

  return config;
});
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: AxiosError) => {
    const status = err.response?.status || 500;

    // Handle timeout errors
    if (err.code === 'ECONNABORTED') {
      console.log('Request timeout - aborting');
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }

    // Handle network errors
    if (!err.response) {
      console.log('Network error - no response');
      return Promise.reject(
        new Error('Network error. Please check your connection.'),
      );
    }

    switch (status) {
      case 401: {
        console.log('unauthorize logout user');
        return Promise.reject(err);
      }
      case 408: {
        console.log('Request timeout');
        return Promise.reject(new Error('Request timeout. Please try again.'));
      }
      case 500: {
        console.log('Server error');
        return Promise.reject(
          new Error('Server error. Please try again later.'),
        );
      }
      default: {
        return Promise.reject(err);
      }
    }
  },
);
export {apiClient};
