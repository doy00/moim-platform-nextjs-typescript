// 찜하기 커스텀 훅
'use client';
import { getDetail, likeApi } from '@/apis/detail/detail.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../auth/auth.hook';

interface IUseLikeMoimOptions {
  onSuccess?: () => void;
}
export const useLikeMoim = (moimId: string, options: IUseLikeMoimOptions = {}) => {
  const { me, isMeLoading } = useAuth();
  const queryClient = useQueryClient();
  const { onSuccess } = options;

  // 찜하기 상태 조회 쿼리
  // const { data: moimDetail, isLoading: isLoadingStatus } = useQuery({
  //   queryKey: ['moim-like', moimId],
  //   queryFn: () => likeApi.checkLike(moimId),
  // });

  const { data: moimDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ['moim', moimId],
    queryFn: () => getDetail(moimId),
  });

  const { data: myLikes } = useQuery({
    queryKey: ['my-likes'],
    queryFn: () => likeApi.getMyLikes(1),
    enabled: !!me,
  });

  // 특정 모임이 내가 찜한 목록에 있는지 확인
  const isLiked = myLikes?.data.some((moim) => moim.moimId === moimId);

  // 찜하기 뮤테이션
  const { mutateAsync: toggleLike, isPending: isToggling } = useMutation({
    mutationFn: async () => {
      return isLiked ? likeApi.unlike(moimId) : likeApi.like(moimId);
    },
    onSuccess: (data) => {
      // [ ] 모임 상세 데이터 업데이트
      // [ ] 찜한 모임 목록 업데이트
    },
    onError: (error) => {
      console.error('찜하기 토글 실패:', error);
    },
  });

  const handleToggleLike = async () => {
    try {
      await toggleLike();
      return true;
    } catch (error) {
      throw error;
    }
  };

  //   const handleToggleLike = useCallback(async () => {
  // const {
  //   successMessage = isLiked ? "찜하기가 취소되었어요" : "찜하기가 완료되었어요",
  //   errorMessage = "잠시후 다시 시도해주세요",
  //   onSuccess
  // } = options;

  // setIsProcessing(true);
  // try {
  // zustand
  // await toggleFavorite(moimId);
  // onSuccess?.();

  // 로컬 스토리지 저장
  // const likedMoims = JSON.parse(localStorage.getItem('likedMoims') || '[]');
  // const updatedLikes = isLiked
  //   ? likedMoims.filter((id: number) => id !== moimId)
  //   : [...likedMoims, moimId];
  // localStorage.setItem('likedMoims', JSON.stringify(updatedLikes));
  // setIsLiked(!isLiked);
  //   } catch (error) {
  //     console.error('찜하기 토글 실패:', error);
  //   }
  // }, [moimId, toggleFavorite, isLiked]);

  return {
    isLiked,
    handleToggleLike,
    isLoading: isLoadingDetail || isToggling,
    likesCount: moimDetail?.likes ?? 0,
  };
};
