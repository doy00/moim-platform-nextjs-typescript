import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/hooks/mypage/queries/getQueryClient';
import { getJoined } from '@/apis/getJoined';
import Header from '@/components/mypage/header/Header';
import MyProfile from '@/components/mypage/myprofile/MyProfile';
import RenderTab from '@/components/mypage/renderTab/RenderTab';

export default async function Mypage() {
  const queryClient = getQueryClient();

  // 서버에서 미리 데이터 페칭
  await queryClient.prefetchQuery({
    queryKey: ['gatherings'],
    queryFn: getJoined,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="h-screen max-w-[1200px] flex flex-col gap-4">
        <Header />
        <MyProfile />
        <RenderTab />
      </div>
    </HydrationBoundary>
  );
}
