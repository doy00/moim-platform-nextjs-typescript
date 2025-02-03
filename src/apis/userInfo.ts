import { IUser, IUserEdit } from '@/types/mypage/user';
import axiosInstance from '@/apis/auth/axios.api';

export const getUserInfo = async () => {
  const url = '/api/auth/me';
  return await axiosInstance.get<IUser, IUser>(url);
};

export const editUserInfo = async (id: string, editUser: IUserEdit) => {
  const url = `/api/auth/me/${id}`;
  return await axiosInstance.put<IUserEdit, IUserEdit>(url, editUser);
};
