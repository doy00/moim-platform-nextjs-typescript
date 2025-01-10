import axiosInstance from './axiosInstance';
import { IGathering } from '@/types/gathering.type';

export const getGatherings = async (): Promise<IGathering[]> => {
  const token = localStorage.getItem('dudemeet-token');
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }
  const { data } = await axiosInstance.get('/gatherings', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
