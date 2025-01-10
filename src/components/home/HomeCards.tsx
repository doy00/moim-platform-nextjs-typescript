'use client';

import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import IntersectionObserver from '@/libs/home/intersectionObserver';
// Components
import HomeCard from './HomeCard';
import { fetchMockMoims, IMoim } from '@/utils/home/fetchMoims';

export default function HomeCards() {
  const {
    data, // 로드된 데이터
    fetchNextPage, // 다음 페이지 로드 함수
    hasNextPage, // 다음 페이지 여부
    isFetchingNextPage, // 다음 페이지 로드 상태
  } = useInfiniteQuery<
    { data: IMoim[]; pagination: { current_page: number; total_pages: number } }, // 반환 데이터 타입
    Error // 에러 타입
  >({
    queryKey: ['moims'], // 쿼리 키
    queryFn: async ({ pageParam = 1 }) => {
      return fetchMockMoims({ page: pageParam });
    }, // 쿼리 함수
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined, // 다음 페이지 번호 반환
    initialPageParam: 1, // 첫 번째 페이지
  });

  // Intersection Observer와 연동
  const handleIntersect = () => {
    console.log('hasNextPage:', hasNextPage, 'isFetchingNextPage:', isFetchingNextPage);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // 추가 페이지 로드
    }
  };

  // 렌더링할 카드 요소
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
      {/* Intersection Observer */}
      <IntersectionObserver onIntersect={handleIntersect} />
    </>
  );
}
