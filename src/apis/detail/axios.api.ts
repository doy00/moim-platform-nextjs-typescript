import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json', 
    'Content-Type': 'application/json',
  },
});

// 브라우저 환경인지 체크하는 함수(로컬스토리지 사용할 때)
const isBrowser = () => typeof window !== 'undefined';

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // 서버 사이드 토큰 처리
    if (config.headers['Authorization']) {
      // console.log('Request Interceptor: 서버 사이드 토큰 사용')
      return config;
    }
    // 클라이언트 사이드 토큰 처리
    if (isBrowser()) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // console.log('Request Interceptor: 로컬스토리지 토큰 사용')
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // console.log('Request Interceptor: 로컬스토리지에 토큰 없음')
      }
    }; 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && isBrowser()) {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      if (currentPath) {
        localStorage.setItem('redirect-after-signin', currentPath);
      }
      window.location.href = '/auth/signin';   // 토큰이 없으면 로그인페이지로 리다이렉트
    }
    // if (error.response) {
    //   // 응답이 200 이외
    //   console.error('API Error:', error.response.data);
    // } else if (error.request) {
    //   // request가 갔으나 response가 없는 경우
    //   console.error('Netwrok Error:', error.request);
    // } else {
    //   // request 관련 에러
    //   console.error('Error:', error.message);
    // }
    return Promise.reject(error.response?.data ?? error);
  }
)