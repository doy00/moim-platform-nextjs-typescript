// app/detail/[id]/page.tsx
import { getDetail } from '@/apis/detail/detail.api';
import DetailContainer from '@/containers/detail/DetailContainer';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Suspense } from "react";
import { IMoimDetail } from '@/types/detail/t-moim';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params } : DetailPageProps) {
  const queryClient = new QueryClient();

  // Dynamic route parameters 사용을 위해 비동기 처리
  const { id: moimId } = await Promise.resolve(params);

  // 서버에서 초기 데이터 prefetching
  try {
    await 
    queryClient.prefetchQuery<IMoimDetail>({
      queryKey: ['detail', moimId],
      queryFn: () => getDetail(moimId),
    })
  } catch (error) {
    console.error('Prefetch 에러 발생:', error);
  } 
  

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
            <DetailContainer moimId={moimId} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};