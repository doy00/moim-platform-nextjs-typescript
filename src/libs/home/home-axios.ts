import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://api.dothemeet.com', // 가칭
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }
)


// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response?.status === 401 ) {
      console.error('Response Error 401, UnAuthorized')
    }
  }
)

export default axiosInstance;