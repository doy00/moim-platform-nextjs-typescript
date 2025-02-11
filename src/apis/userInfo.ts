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

export const passwordEdit = async (password: string) => {
  const url = '/api/auth/me/password';
  return await axiosInstance.post<IEditUserResponse, IEditUserResponse>(url, {
    password,
  });
};

export const sendPasswordResetEmail = async (email: string) => {
  try {
    const url = '/api/auth/send-recovery-email';
    const response = await axiosInstance.post(url, { email });
    return response.data;
  } catch (error) {
    console.error('비밀번호 재설정 이메일 전송 에러:', error);
    throw error;
  }
};

export const resetPassword = async (password: string) => {
  const url = '/api/auth/recover-password';
  return await axiosInstance.post<
    { password: string },
    {
      message: string;
      redirectUrl: string;
    }
  >(url, {
    password,
  });
};
