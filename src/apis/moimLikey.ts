import axiosInstance from '@/apis/auth/axios.api';
import { IMoimLikeyResponse } from '@/types/mypage/moim.type';

export const postMoimLikey = async (moimId: string) => {
  const url = `/api/moims/${moimId}/like`;
  return await axiosInstance.post<IMoimLikeyResponse, IMoimLikeyResponse>(url);
};

export const deleteMoimLikey = async (moimId: string) => {
  const url = `/api/moims/${moimId}/like`;
  return await axiosInstance.delete<IMoimLikeyResponse, IMoimLikeyResponse>(url);
};
