// 찜하기 커스텀 훅
'use client';
import { getDetail, likeApi } from '@/apis/detail/detail.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IMoimMasterResponse } from '@/types/detail/t-moim';
import { QUERY_KEYS } from '@/constants/detail/detail.const';
import { TMe } from '@/types/auth/auth.type';

interface IUseLikeMoimOptions {
  user?: TMe | null;
  initialData?: IMoimMasterResponse; 
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}
export const useLikeMoim = (moimId: string, options: IUseLikeMoimOptions = {}) => {
  const queryClient = useQueryClient();
  const { user, initialData, onSuccess, onError } = options;

  const { data: moimDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: QUERY_KEYS.MOIM_DETAIL(moimId),
    queryFn: () => getDetail(moimId),
    enabled: !!moimId,
    initialData 
  });

  // 현재 유저가 이 모임을 찜했는지 확인
  const isLiked = user && moimDetail?.moim.likedUsers?.includes(user.id);

  const { mutateAsync: toggleLike, isPending: isToggling } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('로그인이 필요합니다');
      const response = await (isLiked ? likeApi.unlike(moimId) : likeApi.like(moimId));
      console.log('Like 응답:', response);
      return response;
    },

    // 낙관적 업데이트를 위한 onMutate
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.MOIM_DETAIL(moimId) }); // 진행중인 모든 관련 쿼리 취소
      const previousData = queryClient.getQueryData<IMoimMasterResponse>(
        QUERY_KEYS.MOIM_DETAIL(moimId),
      ); // 현재 캐시된 데이터 저장
      // 캐시 낙관적 업데이트
      if (previousData?.moim && user) {
        queryClient.setQueryData<IMoimMasterResponse>(QUERY_KEYS.MOIM_DETAIL(moimId), {
          masterUser: previousData?.masterUser, // master 정보는 유지
          moim: {
            ...previousData.moim,
            likes: previousData.moim.likes + 1,
            likedUsers: isLiked
              ? previousData.moim.likedUsers.filter((id) => id !== user.id)
              : [...previousData.moim.likedUsers, user.id],
          },
        });
      }

      return { previousData };
    },

    // 서버 응답 성공 시
    onSuccess: (response) => {
      // 모임 상세 데이터 캐시 업데이트
      queryClient.setQueryData<IMoimMasterResponse>(QUERY_KEYS.MOIM_DETAIL(moimId), (oldData) => {
        if (!oldData || !user) return oldData;
        return {
          ...oldData,
          ...response.data,
        };
      });

      // 관련 다른 쿼리들도 무효화(찜한 목록 캐시 무효화)
      queryClient.invalidateQueries({ queryKey: ['liked-moims'] });

      onSuccess?.();
    },

    // 에러 발생 시
    onError: (error, _, context) => {
      // 이전 상태로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(QUERY_KEYS.MOIM_DETAIL(moimId), context.previousData);
      }
      console.error('찜하기 토글 실패:', error);
      onError?.(error);
    },
  });

  // 찜하기 토글 핸들러
  const handleToggleLike = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log('4. handleToggleLike 시작', { user, isLiked }); // 로그 추가
    if (!user) throw new Error('로그인이 필요합니다');
    try {
      console.log('5. toggleLike mutation 시작'); 
      await toggleLike();
      console.log('6. toggleLike mutation 완료');                
      return true;
    } catch (error) {
      console.error('7. toggleLike 에러:', error);
      throw error;
    }
  };
  return {
    isLiked: !!isLiked,
    handleToggleLike,
    isLoading: isLoadingDetail || isToggling,
    likesCount: moimDetail?.moim.likes ?? 0,
  };
};
