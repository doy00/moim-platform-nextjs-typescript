import axios from 'axios';

const axiosHomeInstance = axios.create({
  baseURL: 'http://54.180.32.63:8080',
});

axiosHomeInstance.interceptors.request.use(
  (config) => {
    console.log('Axios 요청 성공', config);
    // 테스트용 Access Token 하드코딩
    const testToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE3Mzc5NTI0NzYsImV4cCI6MTczODAzODg3Nn0.ystsxr4xTsBBrvzXqzm1QH6d6QfyIF2s3IfPU6Pj_UQ';

    // 실제 로컬스토리지에서 가져온 토큰 또는 테스트용 토큰 사용
    const token = localStorage.getItem('accessToken') || testToken;

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
