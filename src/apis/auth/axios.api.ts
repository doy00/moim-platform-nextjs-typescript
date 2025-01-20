import { TError } from '@/types/auth/error.type';
import { getLocalStorageItem } from '@/utils/auth/auth-client.util';
import { getCookie } from '@/utils/auth/auth-server.util';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEMP_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL,
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const token = getLocalStorageItem('dothemeet-token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  } else {
    const token = await getCookie('dothemeet-token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return config;
});

api.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => response.data as T,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      (error.response?.data as TError)?.code === 'INVALID_TOKEN'
    ) {
      window.location.href = '/signup?type=email';
      return;
    }
    return Promise.reject(error.response?.data);
  },
);

export default api;
