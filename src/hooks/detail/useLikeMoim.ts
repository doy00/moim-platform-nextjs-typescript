// 찜하기 커스텀 훅
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDetail, likeApi } from '@/apis/detail/detail.api';
import { useAuth } from '../auth/auth.hook';
import { IMoimDetail } from '@/types/detail/t-moim';

interface IUseLikeMoimOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}
export const useLikeMoim = (moimId: string, options: IUseLikeMoimOptions = {}) => {
  const { me, isMeLoading } = useAuth();
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options;

  const { data: moimDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ['moim', moimId],
    queryFn: () => getDetail(moimId),
    enabled: !!moimId,
  });

  // 현재 유저가 이 모임을 찜했는지 확인
  const isLiked = me && moimDetail?.likedUsers?.includes(me.id);
  
  const { mutateAsync: toggleLike, isPending: isToggling } = useMutation({
    mutationFn: async () => {
      if (!me) throw new Error('로그인이 필요합니다');
      const response = await (isLiked ? likeApi.unlike(moimId) : likeApi.like(moimId));
      return response;
    },

    // 낙관적 업데이트를 위한 onMutate
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['moim', moimId] });  // 진행중인 모든 관련 쿼리 취소
      const previousMoim = queryClient.getQueryData<IMoimDetail>(['moim', moimId]);  // 현재 캐시된 데이터 저장
      
      // 캐시 낙관적 업데이트
      if (previousMoim && me) {
        queryClient.setQueryData<IMoimDetail>(['moim', moimId], {
          ...previousMoim,
          likes: isLiked ? previousMoim.likes - 1 : previousMoim.likes + 1,
          likedUsers: isLiked
            ? previousMoim.likedUsers.filter(id => id !== me.id)
            : [...previousMoim.likedUsers, me.id],
        });
      }

      return { previousMoim };
    },

    // 서버 응답 성공 시
    onSuccess: (response) => {
      
      // 모임 상세 데이터 캐시 업데이트
      queryClient.setQueryData<IMoimDetail>(['moim', moimId], (oldData) => {
        if (!oldData || !me) return oldData;
        return {
          ...oldData,
          ...response.data
        };
      });

      // 관련 다른 쿼리들도 무효화(찜한 목록 캐시 무효화)
      queryClient.invalidateQueries({ queryKey: ['liked-moims'] });

      onSuccess?.();
    },
    
    // 에러 발생 시
    onError: (error, _, context) => {
      // 이전 상태로 롤백
      if (context?.previousMoim) {
        queryClient.setQueryData(['moim', moimId], context.previousMoim);
      }
      console.error('찜하기 토글 실패:', error);
      onError?.(error);
    },
  });

  // 찜하기 토글 핸들러
  const handleToggleLike = async (e?: React.MouseEvent) => {
    // e?.preventDefault();
    e?.stopPropagation();
    if (!me) throw new Error('로그인이 필요합니다');
    try {
      await toggleLike();
      return true;
    } catch (error) {
      throw error;
    }
  };
  return { 
    isLiked: !!isLiked,
    handleToggleLike,
    isLoading: isLoadingDetail || isToggling || isMeLoading,
    likesCount: moimDetail?.likes ?? 0
  };
};