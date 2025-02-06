'use client';
import MyLikePresenter from '@/components/mylike/MyLikePresenter';
import { useRouter } from 'next/navigation';
import React from 'react';
import { mylikeStore } from '@/stores/detail/mylikeStore';
import { useLikedMoims } from '@/hooks/mylike/useLikedMoims';
import { useFilterStore } from '@/stores/home/filterStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeApi } from '@/apis/detail/detail.api';
import { toast } from 'sonner';
import { GatheringSkeleton } from '@/components/mypage/gatheringCard/GatheringCard';
import { DuduEmpty } from '@/components/detail/icons/DuduEmpty';

export default function MyLikeContainer () {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { moimType, status} = useFilterStore();
  const { removeLike } = mylikeStore();
  
  const {
    moims,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isEmpty
  } = useLikedMoims();


  // 찜하기 취소 뮤테이션
  const unlikeMutation = useMutation({
    mutationFn: (moimId: string) => likeApi.unlike(moimId),
    onSuccess: () => {
      // 찜 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['liked-moims'] });
      toast.success('찜하기가 취소되었습니다');
    },
    onError: (error) => {
      console.error('찜하기 취소 실패:', error);
      toast.error('찜하기 취소에 실패했습니다');
    }
  });

  // 모임 카드 클릭
  const handleClickCard = (moimId: string) => {
    router.push(`/detail/${moimId}`);
  };

  const handleRemoveLike = async (e: React.MouseEvent, moimId: string) => {
    e.stopPropagation();
    try {
      await unlikeMutation.mutateAsync(moimId);
    } catch (error) {
      console.error('찜하기 취소 실패:', error)
    }
  };

  // 필터링된 모임 데이터
  const filteredMoims = React.useMemo(() => 
    moims.filter(moim => {
      const typeMatch = !moimType || moim.moimType === moimType;
      const statusMatch = !status || moim.status === status;
      return typeMatch && statusMatch;
    }),
    [moims, moimType, status]
  );

  console.log('me 찜한 모임:', moims);

  if (isLoading) {
    return <div><GatheringSkeleton /></div>
  }

  if (error) {
    return <div><DuduEmpty /></div>
  }

  return (
    <MyLikePresenter
      // moims={filteredMoims}
      moims={moims}
      onRemoveLike={handleRemoveLike}
      onClickCard={handleClickCard}
    />
  );
}