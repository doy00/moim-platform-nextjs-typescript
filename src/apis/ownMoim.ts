import axiosInstance from '@/apis/axiosInstance';
import { IOwnMoim } from '@/types/mypage/moim.type';

export const getOwnMoim = async (): Promise<IOwnMoim> => {
  const { data } = await axiosInstance.get('/moim/own', {});
  return data;
};
