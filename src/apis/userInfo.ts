import { IUser } from '@/types/mypage/user';
import axiosInstance from '@/apis/axiosInstance';

export const getUserInfo = async (): Promise<IUser> => {
  const { data } = await axiosInstance.get('/auths/user');
  return data;
};

export const editUserInfo = async (id: number, editUser: IUser): Promise<IUser> => {
  const { data } = await axiosInstance.put(`/auths/user`, editUser);
  return data;
};
