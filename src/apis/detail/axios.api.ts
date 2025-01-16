import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json', 'Content-Type': 'application/json',
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