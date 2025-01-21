import axios from 'axios';
import { error } from 'console';

const axiosHomeInstance = axios.create({
  baseURL: 'http://54.180.32.63:8080',
});

axiosHomeInstance.interceptors.request.use(
  (config) => {
    console.log('Axios 요청 성공', config)
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.error('AcessToken이 없습니다.')
    } 
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
);

export default axiosHomeInstance;
