// app/detail/[id]/page.tsx
import * as React from 'react';
import DetailContainer from "@/containers/detail/DetailContainer";
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Suspense } from "react";
import { getDetail } from '@/apis/detail/detail.api';
import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({
  params,
} : DetailPageProps) {
  const queryClient = new QueryClient();

  // Dynamic route parameters 사용을 위해 비동기 처리
  const { id } = await Promise.resolve(params);  
  const moimId = parseInt(id) 

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  // 서버에서 초기 데이터 prefetching
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['detail', moimId],
      queryFn: () => getDetail(moimId, token),
    }),
  ]);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
            <DetailContainer 
              moimId={moimId}
              token={token}
            />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

// 인증 토큰 쿠키 사용
interface GenerateMetadataProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// 서버에서 쿠키를 읽어올 수 있도록 설정
export async function generateMetadata({ 
  params, 
  searchParams
}: GenerateMetadataProps) {
  const { id } = await Promise.resolve(params);
  const cookieStore = await cookies();
  const token: RequestCookie | undefined = cookieStore.get('accessToken');
  
  return {
    title: `모임 상세 - ${id}`,
    token: token?.value,
  };
}

