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
  const { sortOrder, moimType, region, status, isConfirmed } = useFilterStore();
  const { fetchLikes } = useLikeStore();

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['moims'],
    queryFn: ({ pageParam = 1 }) => fetchMoims({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined,
    initialPageParam: 1,
  });

  console.log('📌 [Before Filtering] HomeCards data:', data);

  // 클라이언트 필터링 적용
  const filteredMoims =
    data?.pages.flatMap((page) =>
      page.data.filter((moim: IMoim) => {
        return (
          (moimType === 'all' || moimType.toUpperCase() === moim.moimType.toUpperCase()) &&
          (region.includes('all') || region.includes(moim.address) || !moim.address) &&
          (status === 'all' || status.toUpperCase() === moim.status.toUpperCase()) &&
          (isConfirmed === null || moim.isConfirmed === isConfirmed) // ✅ isConfirmed === null이면 true/false 모두 포함
        );
      }),
    ) || [];

  const sortedMoims = [...filteredMoims].sort((a, b) => {
    if (sortOrder === 'LATEST') {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime(); // 최신순 (startDate 기준)
    }
    if (sortOrder === 'LIKES') {
      return (b.likes ?? 0) - (a.likes ?? 0); // 좋아요 순
    }
    if (sortOrder === 'DEADLINE') {
      return new Date(a.recruitmentDeadline).getTime() - new Date(b.recruitmentDeadline).getTime(); // 마감일 빠른 순
    }
    return 0;
  });

  console.log('✅ [After Filtering] Filtered Moims:', filteredMoims);

  console.log('✅ [After Filtering] Filtered Moims:', filteredMoims);

  const handleIntersect = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <>
      <div className="px-4 pt-[14px] space-y-4">
        {sortedMoims.length > 0 ? (
          sortedMoims.map((item) => <HomeCard key={item.moimId} data={item} />)
        ) : (
          <p className="text-center text-gray-500">필터에 맞는 모임이 없습니다.</p>
        )}
      </div>
      <IntersectionObserver onIntersect={handleIntersect} />
    </>
  );
}
