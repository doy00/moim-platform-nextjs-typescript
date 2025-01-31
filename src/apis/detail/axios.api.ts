import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json', 
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300;  // 200-299 상태 코드만 성공으로 처리
  },
});

// 브라우저 환경인지 체크
const isBrowser = () => typeof window !== 'undefined';

// 토큰 가져오기 함수
const getAccessToken = () => {
  const cookieToken = getCookie('access_token');
  if (cookieToken) return cookieToken;

  // 브라우저 환경에서만 localStorage 확인
  if (isBrowser()) {
    const localToken = localStorage.getItem('accessToken');
    if (localToken) return localToken;
  }
  return null;
}

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data);
  },
);
