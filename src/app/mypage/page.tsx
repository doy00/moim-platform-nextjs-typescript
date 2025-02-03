import { getMyMoim } from '@/apis/myMoim';
import { getParticipatedMoim } from '@/apis/participatedMoim';
import { getReviews } from '@/apis/reviews';
import { getUserInfo } from '@/apis/userInfo';
import MypageContainer from '@/containers/mypage/MypageContainer';
import { getQueryClient } from '@/hooks/mypage/queries/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { getAuthToken } from '@/apis/axiosInstance';

export default async function Mypage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['getUserInfo'],
      queryFn: getUserInfo,
    }),
    queryClient.prefetchQuery({
      queryKey: ['getMyMoim'],
      queryFn: getMyMoim,
    }),
    queryClient.prefetchQuery({
      queryKey: ['getParticipatedMoim'],
      queryFn: getParticipatedMoim,
    }),
    queryClient.prefetchQuery({
      queryKey: ['getReviews'],
      queryFn: getReviews,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MypageContainer />
    </HydrationBoundary>
  );
}
