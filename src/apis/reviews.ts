import axiosInstance from '@/apis/axiosInstance';
import { IReview, IReviewPost } from '@/types/mypage/reviews.type';

export const getReviews = async (): Promise<IReview> => {
  const { data } = await axiosInstance.get('/review/my', {});
  return data;
};

export const postReview = async (review: IReviewPost): Promise<IReview> => {
  const { data } = await axiosInstance.post('/review/save', review);
  return data;
};
