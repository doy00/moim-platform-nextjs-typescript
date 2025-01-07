import axiosInstance from './axiosInstance';
import { ILogin } from '@/types/login';

export const login = async (login: ILogin): Promise<{ token: string }> => {
  const response = await axiosInstance.post('/auths/signin', login);
  return response.data;
};
