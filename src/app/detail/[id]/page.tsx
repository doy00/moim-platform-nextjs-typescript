// app/detail/[id]/page.tsx
import DetailContainer from '@/containers/detail/DetailContainer';
import { Suspense } from 'react';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  // try {
  // [ ] tanstack query 사용. 서버 사이드 렌더링을 위해 모든 데이터를 가져옵니다.
  // const [detailInfo, participants, reviewsResponse] = await Promise.all([
  //   getDetailInfo(Number(params.id)),
  //   getParticipants(Number(params.id)),
  //   getDetailReviews(Number(params.id), { limit: 5 })
  // ]);

  const id = Number((await params).id);
  // const { id } = await params;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailContainer
          id={id}
          // initialData={{
          //   detailInfo,
          //   participants,
          //   reviews: reviewsResponse
          // }}
        />
      </Suspense>
    </div>
  );
}
