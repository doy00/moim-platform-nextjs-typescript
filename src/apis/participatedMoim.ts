import axiosInstance from '@/apis/auth/axios.api';
import { IParticipatedMoim } from '@/types/mypage/moim.type';

export const getParticipatedMoim = async () => {
  const url = '/api/moims/participated';
  return await axiosInstance.get<IParticipatedMoim[], IParticipatedMoim[]>(url);
};
