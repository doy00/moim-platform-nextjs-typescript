import { getCookie } from '@/utils/auth/auth-server.util';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL,
});

const isBrowser = () => typeof window !== 'undefined';

// 토큰 가져오기 함수
const getAccessToken = () => {
  const cookieToken = getCookie('access_token');
  if (cookieToken) return cookieToken;

  // 브라우저 환경에서만 localStorage 확인
  if (isBrowser()) {
    const localToken = localStorage.getItem('access_token');
    if (localToken) return localToken;
  }
  return null;
};

api.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  // 토큰이 있는 경우에만 Authorization 헤더 추가
  // 토큰이 없어도 요청은 계속 진행 (비로그인 사용자도 상세페이지 접근 가능)
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => response.data as T,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  },
);

export default api;
