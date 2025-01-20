import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json', 'Content-Type': 'application/json',
  },
});

// 브라우저 환경인지 체크하는 함수(로컬스토리지 사용할 때)
const isBrowser = () => typeof window !== 'undefined';

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // 브라우저 환경에서만 localStorage 사용
    if (isBrowser()) {
      const token = localStorage.getItem('dothemeet-token');
      if (token) {
        config.headers.sAuthorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  (error) => {
    if (error.response) {
      // 응답이 200 이외
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // request가 갔으나 response가 없는 경우
      console.error('Netwrok Error:', error.request);
    } else {
      // request 관련 에러
      console.error('Error:', error.message);
    }
    return Promise.reject(error.response?.data ?? error); // 에러를 다시 throw
  }
)