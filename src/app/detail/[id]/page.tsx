// app/detail/[id]/page.tsx
import DetailContainer from '@/containers/detail/DetailContainer';
import { Suspense } from "react";
import { DetailSkeleton } from '@/components/detail/DetailSkeleton';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params } : DetailPageProps) {
  const { id: moimId } = await params;

  // 서버 사이드 프리페칭을 제거하고 클라이언트에서만 데이터 로딩
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <DetailContainer moimId={moimId} />
    </Suspense>
  );
}