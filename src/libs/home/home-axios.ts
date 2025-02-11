import axios from 'axios';

const axiosHomeInstance = axios.create({
  baseURL: '/api',
});

axiosHomeInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('AccessToken이 없습니다. 비로그인 상태입니다.');
      }
    }

    return config;
  },
  (error) => {
    console.error('Axios 요청 오류:', error);
    return Promise.reject(error);
  }
);

export default axiosHomeInstance;
