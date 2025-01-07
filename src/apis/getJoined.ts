import axiosInstance from '@/apis/axiosInstance';
import { IJoind } from '@/types/gathering.type';

export const getJoined = async (): Promise<IJoind[]> => {
  const token = localStorage.getItem('dudemeet-token');
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const response = await axiosInstance.get('/gatherings/joined', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
