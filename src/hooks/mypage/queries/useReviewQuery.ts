import { useQuery } from '@tanstack/react-query';
import { getReviews } from '@/apis/reviews';

export const useReviewQuery = () => {
  return useQuery({
    queryKey: ['getReviews'],
    queryFn: getReviews,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};
