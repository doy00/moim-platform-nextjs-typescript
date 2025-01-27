'use client';

import { getMe, postSetCookie, postSignIn, postSignUp, putMe } from '@/apis/auth/auth.api';
import { QUERY_KEY_ME } from '@/constants/auth/auth.const';
import type {
  TAuthSignInInputs,
  TAuthSignUpInputs,
  TMe,
  TMeResponse,
  TPutMeInputs,
  TSetCookieInputs,
  TSetCookieResponse,
  TSignInResponse,
  TSignUpResponse,
} from '@/types/auth/auth.type';
import type { TError } from '@/types/auth/error.type';
import { removeLocalStorageItem, setLocalStorageItem } from '@/utils/auth/auth-client.util';
import { deleteCookie } from '@/utils/auth/auth-server.util';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

type Debounce<T extends unknown[]> = (...args: T) => void;

export const useDebounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number,
): Debounce<T> => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: T) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay],
  );
};

export function useSignUpMutation(): UseMutationResult<TSignUpResponse, TError, TAuthSignUpInputs> {
  return useMutation<TSignUpResponse, TError, TAuthSignUpInputs>({
    mutationFn: postSignUp,
  });
}

export function useSignInMutation(): UseMutationResult<TSignInResponse, TError, TAuthSignInInputs> {
  return useMutation<TSignInResponse, TError, TAuthSignInInputs>({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      setLocalStorageItem('accessToken', data.data.accessToken);
      setLocalStorageItem('refreshToken', data.data.refreshToken);
    },
  });
}

export function useSetCookieMutation(): UseMutationResult<
  TSetCookieResponse,
  TError,
  TSetCookieInputs
> {
  return useMutation<TSetCookieResponse, TError, TSetCookieInputs>({
    mutationFn: postSetCookie,
  });
}

export function usePutMeMutation(): UseMutationResult<TMeResponse, TError, TPutMeInputs> {
  const queryClient = useQueryClient();
  return useMutation<TMeResponse, TError, TPutMeInputs>({
    mutationFn: putMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}

export function useMeQuery(enabled: boolean = true): UseQueryResult<TMe, TError> {
  return useQuery<TMe, TError>({
    queryKey: [QUERY_KEY_ME],
    queryFn: getMe,
    enabled,
  });
}

interface UseAuthProps {
  enabled?: boolean;
}

// me 객체 접근과, 로그아웃을 편리하게 사용하기 위한 훅
export function useAuth(props?: UseAuthProps) {
  const { enabled = true } = props || {};
  const queryClient = useQueryClient();
  const { data: me, isLoading: isMeLoading, error } = useMeQuery(enabled);
  const router = useRouter();

  const signOut = useCallback(() => {
    removeLocalStorageItem('accessToken');
    removeLocalStorageItem('refreshToken');
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    queryClient.setQueryData([QUERY_KEY_ME], null);
    router.refresh();
  }, [queryClient, router]);

  useEffect(() => {
    if (!error) return;
    if (error.message !== 'Unauthorized') {
      console.log(error);
    }
  }, [error, router]);

  return { me, signOut, isMeLoading };
}

// // signout 엔드포인트가 추후 없어진다면 이 뮤테이션도 없어질 예정
// export function useSignOutMutation(): UseMutationResult<TSignOutResponse, TError, void> {
//   const queryClient = useQueryClient();
//   return useMutation<TSignOutResponse, TError, void>({
//     mutationFn: postSignOut,
//     onSuccess: () => {
//       removeLocalStorageItem('accessToken');
//       removeLocalStorageItem('refreshToken');
//       deleteCookie('accessToken');
//       deleteCookie('refreshToken');
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
//       queryClient.setQueryData([QUERY_KEY_ME], null);
//     },
//   });
// }
