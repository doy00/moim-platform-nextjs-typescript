import axiosInstance from '@/apis/auth/axios.api';
import { IReview, IReviewPost, IReviewResponse } from '@/types/mypage/reviews.type';

export const getReviews = async () => {
  const url = '/api/reviews/my';
  return await axiosInstance.get<IReview[], IReview[]>(url);
};

export const postReview = async (review: IReviewPost, moimId: string) => {
  const url = `/api/moims/${moimId}/review`;
  return await axiosInstance.post<IReviewResponse, IReviewResponse>(url, review);
};
