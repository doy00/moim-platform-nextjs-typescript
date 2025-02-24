'use client';

import React from 'react';
import {
  useInfiniteQuery,
  QueryClientProvider,
  QueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { fetchMoims } from '@/utils/home/fetchMoims';
import { MoimResponse } from '@/types/home/i-moim';
import HomeHeader from '@/components/home/HomeHeader';
import HomeHero from '@/components/home/HomeHero';
import HomeCards from '@/components/home/HomeCards';

interface IHomeContainerProps {
  initialData: MoimResponse;
}
const queryClient = new QueryClient();

export default function HomeContainer({ initialData }: IHomeContainerProps) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<
    MoimResponse,         
    Error,                
    InfiniteData<MoimResponse>,
    string[],
    number
  >({
    queryKey: ['moims'],
    queryFn: ({ pageParam = 1 }) => fetchMoims({ pageParam }),
    initialData: {
      pages: [initialData], 
      pageParams: [1],      
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <HomeHeader />
        {/* Hero 컴포넌트가 무한 스크롤 전체가 아닌, 첫 페이지만 필요하다면 data?.pages[0]만 넘겨줄 수도 있음 */}
        <HomeHero data={data} />
        <HomeCards data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage ?? false} />
      </div>
    </QueryClientProvider>
  );
}
