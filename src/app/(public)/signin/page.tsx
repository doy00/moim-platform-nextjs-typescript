import { getMe } from '@/apis/auth.api';
import { QUERY_KEY_ME } from '@/constants/auth.const';
import { SignInContainer } from '@/containers/auth';
import { TMeResponse } from '@/types/auth.type';
import { getCookie } from '@/utils/auth-server.util';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function SignInPage() {
  const token = await getCookie('dudemeet-token');
  if (!token) return <SignInContainer />;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_ME],
    queryFn: () => getMe(),
  });
  const me = queryClient.getQueryData<TMeResponse>([QUERY_KEY_ME]);
  const dehydratedState = dehydrate(queryClient);

  if (me) redirect('/');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydratedState}>
        <SignInContainer />
      </HydrationBoundary>
    </Suspense>
  );
}
