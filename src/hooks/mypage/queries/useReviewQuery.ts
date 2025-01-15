import { useQuery } from '@tanstack/react-query';
import { getReviews } from '@/apis/reviews';

export const useReviewQuery = () => {
  return useQuery({ queryKey: ['reviews'], queryFn: getReviews });
};
