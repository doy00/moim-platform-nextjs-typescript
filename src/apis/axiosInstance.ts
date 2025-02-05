// import axios from 'axios';
// import { getCookie } from 'cookies-next';

// const BASE_URL = `http://54.180.32.63:8080`;

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (typeof window !== 'undefined') {
//       const token = getCookie('accessToken');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log('헤더:', response.headers);
//     console.log('데이터:', response.data);
//     return response;
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       window.location.replace('/');
//     }
//     return Promise.reject(error);
//   },
// );

// export default axiosInstance;
