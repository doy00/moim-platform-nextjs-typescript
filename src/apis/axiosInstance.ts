import axios from 'axios';
// import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';

const TEAM_ID = '6-5';
const BASE_URL = `https://fe-adv-project-together-dallaem.vercel.app/${TEAM_ID}`;
// const BASE_URL = `http://54.180.32.63:8080/swagger-ui/index.html#/`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // url: URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.replace('/');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
