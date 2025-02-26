// app/detail/[id]/page.tsx
import DetailContainer from '@/containers/detail/DetailContainer';
import { Suspense } from "react";
import { DetailSkeleton } from '@/components/detail/DetailSkeleton';
import { getDetail } from '@/apis/detail/detail.api';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/detail/detail.const';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params } : DetailPageProps) {
  const { id: moimId } = await params;
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.MOIM_DETAIL(moimId),
    queryFn: () => getDetail(moimId),
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5 // 5분
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<DetailSkeleton />}>
        <DetailContainer moimId={moimId} />
      </Suspense>
    </HydrationBoundary>
  );
}