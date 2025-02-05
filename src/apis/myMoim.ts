import axiosInstance from '@/apis/auth/axios.api';
import { IMyMoim } from '@/types/mypage/moim.type';

export const getMyMoim = async () => {
  const url = '/api/moims/my';
  return await axiosInstance.get<IMyMoim[], IMyMoim[]>(url);
};
