// app/detail/[id]/page.tsx
import * as React from 'react';
import DetailContainer from "@/containers/detail/DetailContainer";
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Suspense } from "react";
import { getDetail } from '@/apis/detail/detail.api';


interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({
  params,
} : DetailPageProps) {
  // queryClient 생성
  const queryClient = new QueryClient();

  // Dynamic route parameters 사용을 위해 비동기 처리
  const { id } = await Promise.resolve(params);  
  const moimId = parseInt(id) 

  // 서버에서 초기 데이터 prefetching
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['detail', id],
      queryFn: () => getDetail(moimId),
    }),
    // [ ] 쿼리들 추가 예정
  ]);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
            <DetailContainer 
            id={moimId}
            />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
