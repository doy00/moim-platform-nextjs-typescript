import { getMe } from '@/apis/auth.api';
import { QUERY_KEY_ME } from '@/constants/auth.const';
import SignUpContainer from '@/containers/auth/SignUpContainer';
import { getCookie } from '@/utils/auth-server.util';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function SignUpPage() {
  const token = await getCookie('dudemeet-token');
  if (!token) return <SignUpContainer />;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_ME],
    queryFn: () => getMe(),
  });
  const me = await queryClient.getQueryData([QUERY_KEY_ME]);
  const dehydratedState = dehydrate(queryClient);

  if (me) redirect('/');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydratedState}>
        <SignUpContainer />
      </HydrationBoundary>
    </Suspense>
  );
}
