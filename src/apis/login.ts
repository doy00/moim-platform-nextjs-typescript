import axiosInstance from './axiosInstance';
import { ILogin } from '@/types/login';

export const login = async (credentials: ILogin) => {
  const response = await axiosInstance.post('/auths/signin', credentials);
  return response.data;
};
