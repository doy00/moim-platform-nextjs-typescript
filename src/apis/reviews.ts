import axiosInstance from './axiosInstance';
import { IReviewResponse } from '@/types/reviews.type';

export const getReviews = async (): Promise<IReviewResponse> => {
  const token = localStorage.getItem('dudemeet-token');
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const response = await axiosInstance.get('/reviews', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
