import { getJoined } from '@/apis/myMoim';
import { getGatherings } from '@/apis/ownMoim';
import { getReviews } from '@/apis/reviews';
import { getUserInfo } from '@/apis/userInfo';
import MypageContainer from '@/containers/mypage/MypageContainer';
import { getQueryClient } from '@/hooks/mypage/queries/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Mypage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/auth/signin');
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
