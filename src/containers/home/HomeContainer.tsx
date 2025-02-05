'use client';

import React from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import HomeHero from '@/components/home/HomeHero';
import HomeCards from '@/components/home/HomeCards';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMoims } from '@/utils/home/fetchMoims';

export default function HomeContainer() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['moims'],
    queryFn: ({ pageParam = 1 }) => fetchMoims({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined,
    initialPageParam: 1,
  });

  return (
    <div id="layout-container" tabIndex={-1}>
      <HomeHeader />
      <HomeHero data={data} />
      <HomeCards data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
    </div>
  );
}
