'use client';

import { getMe, postSignIn, postSignOut, postSignUp, putMe } from '@/apis/auth/auth.api';
import { QUERY_KEY_ME } from '@/constants/auth/auth.const';
import type {
  TAuthSignInInputs,
  TAuthSignUpInputs,
  TMeResponse,
  TPutMeInputs,
  TSignInResponse,
  TSignOutResponse,
  TSignUpResponse,
} from '@/types/auth/auth.type';
import type { TError } from '@/types/auth/error.type';
import { removeLocalStorageItem, setLocalStorageItem } from '@/utils/auth/auth-client.util';
import { deleteCookie, setCookie } from '@/utils/auth/auth-server.util';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

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
  const queryClient = useQueryClient();
  return useMutation<TSignUpResponse, TError, TAuthSignUpInputs>({
    mutationFn: postSignUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}

export function useSignInMutation(): UseMutationResult<TSignInResponse, TError, TAuthSignInInputs> {
  const queryClient = useQueryClient();
  return useMutation<TSignInResponse, TError, TAuthSignInInputs>({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      setLocalStorageItem('dothemeet-token', data.token);
      setCookie({
        name: 'dothemeet-token',
        value: data.token,
        maxAge: 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}

export function useSignOutMutation(): UseMutationResult<TSignOutResponse, TError, void> {
  const queryClient = useQueryClient();
  return useMutation<TSignOutResponse, TError, void>({
    mutationFn: postSignOut,
    onSuccess: () => {
      removeLocalStorageItem('dothemeet-token');
      deleteCookie('dothemeet-token');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
      queryClient.setQueryData([QUERY_KEY_ME], null);
    },
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

export function useMeQuery(enabled: boolean = true): UseQueryResult<TMeResponse, TError> {
  return useQuery<TMeResponse, TError>({
    queryKey: [QUERY_KEY_ME],
    queryFn: getMe,
    enabled,
  });
}
