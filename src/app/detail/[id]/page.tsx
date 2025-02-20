// app/detail/[id]/page.tsx
import DetailContainer from '@/containers/detail/DetailContainer';
import { Suspense } from "react";
import { DetailSkeleton } from '@/components/detail/DetailSkeleton';
import { usePrefetchDetail } from '@/hooks/detail/useMoimDetail';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params } : DetailPageProps) {
  // Dynamic route parameters 사용을 위해 비동기 처리
  const { id: moimId } = await params;
  usePrefetchDetail(moimId);
  return (
    <div>
      <Suspense fallback={<DetailSkeleton />}>
        <DetailContainer moimId={moimId} />
      </Suspense>
    </div>
  );
}