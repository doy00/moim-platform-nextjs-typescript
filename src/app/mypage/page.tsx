import MypageContainer from '@/containers/mypage/MypageContainer';
import { getQueryClient } from '@/hooks/mypage/queries/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function Mypage() {
  const queryClient = getQueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MypageContainer />
    </HydrationBoundary>
  );
}
