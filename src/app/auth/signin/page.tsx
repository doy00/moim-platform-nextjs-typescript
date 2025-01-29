import { SignInContainer } from '@/containers/auth';
import { getCookie, prefetchMe } from '@/utils/auth/auth-server.util';
import { HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const token = await getCookie('sb-kabbnwozubbpbafvlolf-auth-token');
  if (!token) return <SignInContainer />;

  const { me, dehydratedState } = await prefetchMe();

  if (me) redirect('/');

  return (
    <HydrationBoundary state={dehydratedState}>
      <SignInContainer />
    </HydrationBoundary>
  );
}
