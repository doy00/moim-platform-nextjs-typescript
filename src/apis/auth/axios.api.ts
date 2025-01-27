import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL,
});

// api.interceptors.request.use(async (config) => {
//   if (typeof window !== 'undefined') {
//     const token = getLocalStorageItem('accessToken');
//     if (token) {
//       config.headers.set('Authorization', `Bearer ${token}`);
//     }
//   } else {
//     const token = await getCookie('accessToken');
//     if (token) {
//       config.headers.set('Authorization', `Bearer ${token}`);
//     }
//   }
//   return config;
// });

api.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => response.data as T,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  },
);

export default api;
