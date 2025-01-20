import MypageContainer from '@/containers/mypage/MypageContainer';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/hooks/mypage/queries/getQueryClient';
import { getJoined } from '@/apis/myMoim';
import { getGatherings } from '@/apis/ownMoim';
import { getUserInfo } from '@/apis/userInfo';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getReviews } from '@/apis/reviews';

export default async function Mypage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/');
  }

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['getUserInfo'],
      queryFn: getUserInfo,
    }),
    queryClient.prefetchQuery({
      queryKey: ['getJoinedGatherings'],
      queryFn: getJoined,
    }),
    queryClient.prefetchQuery({
      queryKey: ['getCreatedGatherings'],
      queryFn: getGatherings,
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
