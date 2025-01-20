import axiosInstance from '@/apis/axiosInstance';
import { IJoind } from '@/types/gathering.type';

export const getMyMoim = async (): Promise<IJoind[]> => {
  const { data } = await axiosInstance.get('/moim/my', {});
  return data;
};

export const getJoined = async (): Promise<IJoind[]> => {
  const { data } = await axiosInstance.get('/gatherings/joined', {});
  return data;
};
