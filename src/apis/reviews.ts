import axiosInstance from '@/apis/auth/axios.api';
import { IReview, IReviewPost } from '@/types/mypage/reviews.type';

export const getReviews = async () => {
  const url = '/api/reviews/my';
  return await axiosInstance.get<IReview[], IReview[]>(url);
};

export const postReview = async (review: IReviewPost) => {
  const url = '/api/moims/[id]/review';
  return await axiosInstance.post<IReview, IReview>(url, review);
};
