import axiosInstance from '@/apis/axiosInstance';
import { IReviewResponse } from '@/types/mypage/reviews.type';

export const getReviews = async (): Promise<IReviewResponse> => {
  const { data } = await axiosInstance.get('/reviews', {});
  return data;
};
