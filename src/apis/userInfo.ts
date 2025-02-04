import { IUser, IUserEdit, IEditUserResponse } from '@/types/mypage/user';
import axiosInstance from '@/apis/auth/axios.api';
import { useUserFormData } from '@/hooks/mypage/useUserFormData';

export const getUserInfo = async () => {
  const url = '/api/auth/me';
  return await axiosInstance.get<IUser, IUser>(url);
};

export const editUserInfo = async (editUser: IUserEdit) => {
  const { createFormData } = useUserFormData();
  const formData = createFormData(editUser);
  const url = '/api/auth/me';
  return await axiosInstance.put<IEditUserResponse, IEditUserResponse>(url, formData);
};
