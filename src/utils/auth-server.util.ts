'use server';

import { getMe } from '@/apis/auth.api';
import { QUERY_KEY_ME } from '@/constants/auth.const';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(name);
  cookieStore.set(name, '', { maxAge: 0 });
}

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function setCookie(options: ResponseCookie): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    ...options,
  });
}

export const prefetchMe = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_ME],
    queryFn: () => getMe(),
  });
  const me = await queryClient.getQueryData([QUERY_KEY_ME]);
  const dehydratedState = dehydrate(queryClient);
  return { me, dehydratedState };
};
