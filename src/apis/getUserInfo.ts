import { IUser } from '@/types/user';
import axiosInstance from './axiosInstance';

export const getUserInfo = async (): Promise<IUser> => {
  const { data } = await axiosInstance.get('/auths/user');
  return data;
};
