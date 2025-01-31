'use client';

import { QUERY_KEY_ME } from '@/constants/auth/auth.const';
import { useMeQuery } from '@/hooks/auth/auth.hook';
import { setLocalStorageItem } from '@/utils/auth/auth-client.util';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthTempPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const next = searchParams.get('next');
  const token = searchParams.get('token');
  const { data: me } = useMeQuery(true);

  useEffect(() => {
    if (token) {
      setLocalStorageItem('access_token', token);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    }
  }, [token, router, next, queryClient]);

  useEffect(() => {
    if (!me) return;
    router.replace(next || '/');
  }, [me, router, next]);

  return null;
}
