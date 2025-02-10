import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMoimLikey, deleteMoimLikey } from '@/apis/moimLikey';

export const useMoimLikeQuery = ({ moimId, isLiked }: { moimId: string; isLiked: boolean }) => {
  const queryClient = useQueryClient();

  const likeAPI = isLiked ? deleteMoimLikey : postMoimLikey;

  return useMutation({
    mutationFn: () => likeAPI(moimId),
    onSuccess: () => {
      // 목록 데이터도 업데이트가 필요한 경우
      queryClient.invalidateQueries({
        queryKey: ['getParticipatedMoim'],
      });
    },
    onError: (error: any) => {
      console.error('좋아요 처리 중 오류 발생:', error);
    },
  });
};
