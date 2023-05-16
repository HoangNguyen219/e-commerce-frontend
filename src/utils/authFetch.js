import axios from 'axios';
import { baseUrl } from './constants';

const authFetch = (logoutUser) => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default authFetch;
