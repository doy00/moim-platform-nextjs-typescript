import axiosInstance from '@/apis/axiosInstance';
import { IMyMoim } from '@/types/mypage/moim.type';

export const getMyMoim = async (): Promise<IMyMoim> => {
  const { data } = await axiosInstance.get('/moim/my', {});
  return data;
};
