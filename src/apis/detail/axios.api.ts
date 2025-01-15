import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dothemeet-token');
    if (token) {
      config.headers.sAuthorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료시 로그아웃 상태로 변경
      // 찜 여부 로컬스토리지로 확인
      // [ ] localStorage.removeItem('dudemeet-token');


    }
    return Promise.reject(error.response?.data ?? error); // 에러를 다시 throw
  }
)