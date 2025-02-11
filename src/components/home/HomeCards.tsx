'use client';

import IntersectionObserver from '@/libs/home/intersectionObserver';
import { useFilterStore } from '@/stores/home/filterStore';
import { useLikeStore } from '@/stores/home/likeStore';
import { IMoim } from '@/types/home/i-moim';
import { useEffect } from 'react';
import HomeCard from './HomeCard';

interface HomeCardsProps {
  data: any; 
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export default function HomeCards({ data, fetchNextPage, hasNextPage }: HomeCardsProps) {
  const { sortOrder, moimType, onoff, status, isConfirmed } = useFilterStore();
  const { fetchLikes } = useLikeStore();

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const filteredMoims =
    data?.pages.flatMap((page: any) =>
      page.data.filter((moim: IMoim) => {
        return (
          (moimType === 'all' || moimType.toUpperCase() === moim.moimType.toUpperCase()) &&
          (status === 'all' || status.toUpperCase() === moim.status.toUpperCase()) &&
          (isConfirmed === null || moim.isConfirmed === isConfirmed) &&
          (onoff === 'all' ||
            (onoff === 'online' && moim.address.includes('온라인으로 진행합니다')) ||
            (onoff === 'offline' && !moim.address.includes('온라인으로 진행합니다')))
        );
      }),
    ) || [];

  const sortedMoims = [...filteredMoims].sort((a, b) => {
    if (sortOrder === 'LATEST') {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime(); 
    }
    if (sortOrder === 'LIKES') {
      return (b.likes ?? 0) - (a.likes ?? 0); 
    }
    if (sortOrder === 'DEADLINE') {
      return new Date(a.recruitmentDeadline).getTime() - new Date(b.recruitmentDeadline).getTime(); 
    }
    return 0;
  });


  const handleIntersect = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <>
      <div className="px-4 pt-[14px] space-y-4 bg-background300 min-h-[827px] pb-[62px] h-dvh">
        {sortedMoims.length > 0 ? (
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-x-5 gap-y-6">
            {sortedMoims.map((item) => (
              <HomeCard key={item.moimId} data={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">필터에 맞는 모임이 없습니다.</p>
        )}
      </div>
      <IntersectionObserver onIntersect={handleIntersect} />
    </>
  );
}
