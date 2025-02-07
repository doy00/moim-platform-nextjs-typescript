import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMoimLikey, deleteMoimLikey } from '@/apis/moimLikey';

export const useMoimLikeMutation = (moimId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postMoimLikey(moimId),
    onSuccess: () => {
      // 해당 모임 데이터만 업데이트
      queryClient.invalidateQueries({
        queryKey: ['moims', moimId],
      });
      // 목록 데이터도 업데이트가 필요한 경우
      queryClient.invalidateQueries({
        queryKey: ['moims'],
      });
    },
    onError: (error: any) => {
      console.error('좋아요 처리 중 오류 발생:', error);
    },
  });
};
