// components/home/HomeCards.tsx
'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import IntersectionObserver from '@/libs/home/intersectionObserver';
import { fetchMoims } from '@/utils/home/fetchMoims';
import { useFilterStore } from '@/stores/home/filterStore';
import HomeCard from './HomeCard';
import { IMoim } from '@/types/home/i-moim';
import { useLikeStore } from '@/stores/home/likeStore';

export default function HomeCards() {
  const { moimType, region, moimStatus, sortOrder } = useFilterStore();
  const { fetchLikes } = useLikeStore()

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  // React Query로 데이터 가져오기
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['moims'],
    queryFn: ({ pageParam = 1 }) => fetchMoims({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined,
    initialPageParam: 1,
  });

  // 클라이언트 필터링
  const filteredMoims = data?.pages.flatMap((page) =>
    page.data.filter((moim: IMoim) => {
      // 필터 조건 적용
      return (
        (!moimType || moim.moimType === moimType) &&
        (!region || region.includes(moim.roadAddress)) &&
        (!moimStatus || moim.moimStatus === moimStatus)
      );
    })
  );

  const handleIntersect = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <>
      <div className="px-4 pt-[14px] space-y-4">
        {filteredMoims?.map((item) => (
          <HomeCard key={item.moimId} data={item} />
        ))}
      </div>
      <IntersectionObserver onIntersect={handleIntersect} />
    </>
  );
}
