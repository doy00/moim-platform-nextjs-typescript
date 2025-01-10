'use client';

import React from 'react';
// Tanstack-Query
import { useInfiniteQuery } from '@tanstack/react-query';
import IntersectionObserver from '@/libs/home/intersectionObserver';
// Store
import { useFilterStore } from '@/stores/home/filterStore';
// Components
import HomeCard from './HomeCard';
import { fetchMockMoims, IMoim } from '@/utils/home/fetchMoims';

export default function HomeCards() {
  const { category, region, status } = useFilterStore();


  const {
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
  } = useInfiniteQuery<
    { data: IMoim[]; pagination: { current_page: number; total_pages: number } }, 
    Error 
  >({
    queryKey: ['moims', category, region, status], 
    queryFn: async ({ pageParam = 1 }) => {
      return fetchMockMoims({ page: pageParam, category, region, status });
    }, 
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined, 
    initialPageParam: 1, 
  });

  const handleIntersect = () => {
    console.log('hasNextPage:', hasNextPage, 'isFetchingNextPage:', isFetchingNextPage);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderedCard = (
    <div className="px-4 pt-[14px] space-y-4">
      {data?.pages.map((page) =>
        page.data.map((item: IMoim) => <HomeCard key={item.id} data={item} />)
      )}
      {/* 추가 데이터 로딩 상태 표시 */}
      {isFetchingNextPage && <p className="text-center">Loading more...</p>}
    </div>
  );

  return (
    <>
      {renderedCard}
      <IntersectionObserver onIntersect={handleIntersect} />
    </>
  );
}
