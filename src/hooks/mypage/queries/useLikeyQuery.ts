import { useMutation } from '@tanstack/react-query';
import { postMoimLikey, deleteMoimLikey } from '@/apis/moimLikey';

export const useMoimLikeQuery = ({
  moimId,
  isLiked,
  refetch,
}: {
  moimId: string;
  isLiked: boolean;
  refetch: () => void;
}) => {
  const likeAPI = isLiked ? deleteMoimLikey : postMoimLikey;

  return useMutation({
    mutationFn: () => likeAPI(moimId),
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      console.error('좋아요 처리 중 오류 발생:', error);
    },
  });
};
