// 찜하기 커스텀훅
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface UseLikeMoimOptions {
  successMessage?: string;
  errorMessage?: string;
}

export const useLikeMoim = (moimId: number, options: UseLikeMoimOptions = {}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 찜 초기상태
  useEffect(() => {
    const loadLikeStatus = async () => {
      try {
        const likedMoims = JSON.parse(localStorage.getItem('likedMoims') || '[]');
        setIsLiked(likedMoims.includes(moimId));
        
      } catch (error) {
        console.error('좋아요 상태 로드 실패:', error);
      }
    };

    loadLikeStatus();
  }, [moimId]);

  const toggleLike = useCallback(async () => {
    const {
      successMessage = isLiked ? "찜하기가 취소되었어요" : "찜하기가 완료되었어요",
      errorMessage = "잠시후 다시 시도해주세요"
    } = options;

    setIsProcessing(true);
    try {
      // [ ] API
      const likedMoims = JSON.parse(localStorage.getItem('likedMoims') || '[]');
      const updatedLikes = isLiked 
        ? likedMoims.filter((id: number) => id !== moimId)
        : [...likedMoims, moimId];
      localStorage.setItem('likedMoims', JSON.stringify(updatedLikes));

      setIsLiked(!isLiked);
      toast.success(successMessage);
    } catch (error) {
      console.error('찜하기 토글 실패:', error);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [moimId, isLiked, options]);

  return { isLiked, isProcessing, toggleLike };
  };