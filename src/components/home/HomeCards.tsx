'use client';

import React, { useEffect } from 'react';
// Tanstack-Query
import { useInfiniteQuery } from '@tanstack/react-query';
import IntersectionObserver from '@/libs/home/intersectionObserver';
// Store
import { useFilterStore } from '@/stores/home/filterStore';
import { useFavoriteStore } from '@/stores/home/favoriteStore';
// Components
import HomeCard from './HomeCard';
import { fetchMockMoims } from '@/utils/home/fetchMoims';
import { IMoim } from '@/types/home/i-moim';

export default function HomeCards() {
  const { category, region, status, confirmed, sortOrder } = useFilterStore();
  const { fetchFavorites } = useFavoriteStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    { data: IMoim[]; pagination: { current_page: number; total_pages: number } },
    Error
  >({
    queryKey: ['moims', category, region, status, confirmed, sortOrder],
    queryFn: ({ pageParam = 1 }) =>
      fetchMockMoims({
        page: pageParam,
        type: category,
        region: region.length > 0 ? region.join(',') : 'all',
        status,
        confirmed,
        sortOrder
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined,
    initialPageParam: 1,
  });

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <div className="px-4 pt-[14px] space-y-4">
        {data?.pages.map((page) =>
          page.data.map((item) => <HomeCard key={item.id} data={item} />)
        )}
        {isFetchingNextPage && <p className="text-center">Loading more...</p>}
      </div>
      <IntersectionObserver onIntersect={handleIntersect} />
    </>
  );
}
