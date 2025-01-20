import axiosInstance from './axiosInstance';
import { IReviewResponse } from '@/types/reviews.type';

export const getReviews = async (): Promise<IReviewResponse> => {
  const { data } = await axiosInstance.get('/reviews', {});
  return data;
};
