import SignUpContainer from '@/containers/auth/SignUpContainer';
import { getCookie, prefetchMe } from '@/utils/auth/auth-server.util';
import { HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const token = await getCookie('sb-kabbnwozubbpbafvlolf-auth-token');
  if (!token) return <SignUpContainer />;

  const { me, dehydratedState } = await prefetchMe();

  if (me) redirect('/');

  return (
    <HydrationBoundary state={dehydratedState}>
      <SignUpContainer />
    </HydrationBoundary>
  );
}
