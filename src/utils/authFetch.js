import axios from 'axios';
import { baseUrl } from './constants';

const authFetch = (logoutUser) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || baseUrl,
    withCredentials: true,
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
