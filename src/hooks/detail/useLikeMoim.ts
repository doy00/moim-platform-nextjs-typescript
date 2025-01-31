// 찜하기 커스텀훅
'use client';
import { useCallback } from 'react';
import { useFavoriteStore } from '@/stores/detail/favoriteStore';
import { toast } from 'sonner';

interface UseLikeMoimOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
}

export const useLikeMoim = (moimId: number, options: UseLikeMoimOptions = {}) => {
  const {
    successMessage = "찜하기가 완료되었어요",
    errorMessage = "잠시후 다시 시도해주세요",
    onSuccess: onSuccessCallback
  }= options;


  // 찜 초기상태 확인 useEffect 사용
  // const [isLiked, setIsLiked] = useState(false);
  // const [isProcessing, setIsProcessing] = useState(false);
  const { favorites, isFavorite, toggleFavorite, isLoading } = useFavoriteStore();
  const isLiked = favorites.has(moimId);

  // useEffect(() => {
  //   const loadLikeStatus = async () => {
  //     try {
  //       const likedMoims = JSON.parse(localStorage.getItem('likedMoims') || '[]');
  //       setIsLiked(likedMoims.includes(moimId));
        
  //     } catch (error) {
  //       console.error('찜하기 상태 로드 실패:', error);
  //     }
  //   };

  //   loadLikeStatus();
  // }, [moimId]);

  const handleToggleLike = useCallback(async () => {
    const {
      successMessage = isLiked ? "찜하기가 취소되었어요" : "찜하기가 완료되었어요",
      errorMessage = "잠시후 다시 시도해주세요",
      onSuccess
    } = options;

    // setIsProcessing(true);
    try {
      // zustand
      await toggleFavorite(moimId);
      onSuccess?.();

      // 로컬 스토리지 저장
      // const likedMoims = JSON.parse(localStorage.getItem('likedMoims') || '[]');
      // const updatedLikes = isLiked 
      //   ? likedMoims.filter((id: number) => id !== moimId)
      //   : [...likedMoims, moimId];
      // localStorage.setItem('likedMoims', JSON.stringify(updatedLikes));
      // setIsLiked(!isLiked);
      toast.success(successMessage);
    } catch (error) {
      console.error('찜하기 토글 실패:', error);
      toast.error(errorMessage);
    } 
  }, [moimId, toggleFavorite, isLiked]);

  return { 
    isLiked,
    handleToggleLike,
  };
};