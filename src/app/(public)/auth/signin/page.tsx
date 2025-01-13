import { SignInContainer } from '@/containers/auth';
import { getCookie, prefetchMe } from '@/utils/auth/auth-server.util';
import { HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function SignInPage() {
  const token = await getCookie('dothemeet-token');
  if (!token) return <SignInContainer />;

  const { me, dehydratedState } = await prefetchMe();

  if (me) redirect('/');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydratedState}>
        <SignInContainer />
      </HydrationBoundary>
    </Suspense>
  );
}
