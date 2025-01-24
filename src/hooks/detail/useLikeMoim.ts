// 찜하기 커스텀훅
// [ ] 아직 likeMoim 없음, useJoinMoim과 비슷하게 작성
'use client';
import { useState, useEffect, useCallback } from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { likeMoim } from '@/apis/detail/detail.api';
// import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import { toast } from 'sonner';

interface UseLikeMoimOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
}

export const useLikeMoim = (moimId: number, options: UseLikeMoimOptions = {}) => {
// export const useLikeMoim = (options: UseLikeMoimOptions = {}) => {

  // const queryClient = useQueryClient();

  const {
    successMessage = "찜하기가 완료되었어요",
    errorMessage = "잠시후 다시 시도해주세요",
    onSuccess: onSuccessCallback
  }= options;

  // tanstack query
  // const mutation = useMutation({
  //   mutationFn: (moimId: number) => useLikeMoim(moimId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['detail-info'] });
  //     queryClient.invalidateQueries({ queryKey: ['detail-participants'] });
  //     queryClient.invalidateQueries({ queryKey: ['detail-reviews'] });

  //     toast.success(successMessage);
  //     onSuccessCallback?.();
  //   },
  //   onError: (error: Error) => {
  //     console.error('찜하기 실패:', error);
  //   toast.error(errorMessage);
  //   }
  // });


  // 찜 초기상태 확인 useEffect 사용
  const [isLiked, setIsLiked] = useState(false);
  // const [isLiked, setIsLiked] = useState(() => {
  //   if (typeof window === 'undefined') return false;
  //   const likedMoims = localStorage.getItem('likedMoims');
  //   return likedMoims ? JSON.parse(likedMoims).includes(moimId) : false;
  // });

  const [isProcessing, setIsProcessing] = useState(false);

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

  return { 
    isLiked,
    isProcessing, 
    toggleLike 
    // likeMoim: mutation.mutate,
    
    // error: mutation.error,
  };
};