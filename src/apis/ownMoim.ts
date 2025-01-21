import axiosInstance from '@/apis/axiosInstance';
import { IGathering } from '@/types/mypage/gathering.type';

export const getOwnMoim = async (): Promise<IGathering[]> => {
  const { data } = await axiosInstance.get('/moim/own', {});
  return data;
};

export const getGatherings = async (): Promise<IGathering[]> => {
  const { data } = await axiosInstance.get('/gatherings', {});
  return data;
};
