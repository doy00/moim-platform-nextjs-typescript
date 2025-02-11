import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReviews, postReview } from '@/apis/reviews';
import { IReviewPost, IReviewResponse } from '@/types/mypage/reviews.type';

export const useReviewQuery = () => {
  return useQuery({
    queryKey: ['getReviews'],
    queryFn: getReviews,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};

interface ReviewMutationVariables extends IReviewPost {
  moimId: string;
}

export const usePostReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IReviewResponse, Error, ReviewMutationVariables>({
    mutationFn: ({ review, rate, moimId }) => postReview({ review, rate }, moimId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postReview'] });
    },
    onError: (error) => {
      console.error('리뷰 작성 실패:', error);
    },
  });
};
