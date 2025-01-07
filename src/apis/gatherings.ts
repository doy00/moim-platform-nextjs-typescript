import axiosInstance from './axiosInstance';
import { IGathering } from '@/types/gathering.type';

export const getGatherings = async (): Promise<IGathering[]> => {
  const { data } = await axiosInstance.get('/gatherings');
  return data;
};
