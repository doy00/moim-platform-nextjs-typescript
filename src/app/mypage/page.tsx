import MypageContainer from '@/containers/mypage/MypageContainer';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/hooks/mypage/queries/getQueryClient';
import { getJoined } from '@/apis/getJoined';
import { getGatherings } from '@/apis/gatherings';
import { getUserInfo } from '@/apis/userInfo';

export default async function Mypage() {
  const queryClient = getQueryClient();

  // 서버에서 미리 데이터 페칭
  await queryClient.prefetchQuery({
    queryKey: ['getJoinedGatherings'],
    queryFn: getJoined,
  });

  await queryClient.prefetchQuery({
    queryKey: ['getGatherings'],
    queryFn: getGatherings,
  });

  await queryClient.prefetchQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MypageContainer />
    </HydrationBoundary>
  );
}
