import axios from 'axios';

const axiosHomeInstance = axios.create({
  baseURL: '/api',
});

axiosHomeInstance.interceptors.request.use(
  (config) => {
    console.log('Axios 요청 성공', config);

    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization Header:', config.headers.Authorization);
    } else {
      console.error('AccessToken이 없습니다.');
    }
    return config;
  },
  (error) => {
    console.error('Axios 요청 오류:', error);
    return Promise.reject(error);
  }
);

export default axiosHomeInstance;
