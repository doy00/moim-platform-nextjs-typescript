// app/detail/[id]/page.tsx
import { getDetail } from '@/apis/detail/detail.api';
import DetailContainer from '@/containers/detail/DetailContainer';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const queryClient = new QueryClient();

  // Dynamic route parameters 사용을 위해 비동기 처리
  const { id } = await Promise.resolve(params);
  const moimId = parseInt(id);

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  // 서버에서 초기 데이터 prefetching
  await queryClient.prefetchQuery({
    queryKey: ['detail', moimId],
    queryFn: () => getDetail(moimId, token),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <DetailContainer moimId={moimId} token={token} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}

// 인증 토큰 쿠키 사용
interface GenerateMetadataProps {
  params: Promise<{ id: string }>;
}

// 서버에서 쿠키를 읽어올 수 있도록 설정
export async function generateMetadata({ params }: GenerateMetadataProps) {
  const { id } = await Promise.resolve(params);
  const cookieStore = await cookies();
  const token: RequestCookie | undefined = cookieStore.get('accessToken');

  return {
    title: `모임 상세 - ${id}`,
    token: token?.value,
  };
}
