import SignUpContainer from '@/containers/auth/SignUpContainer';
import { getCookie, prefetchMe } from '@/utils/auth-server.util';
import { HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function SignUpPage() {
  const token = await getCookie('dudemeet-token');
  if (!token) return <SignUpContainer />;

  const { me, dehydratedState } = await prefetchMe();

  if (me) redirect('/');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydratedState}>
        <SignUpContainer />
      </HydrationBoundary>
    </Suspense>
  );
}
