'use client';

import {
  deleteSignOut,
  getMe,
  getProviderLogin,
  postSignIn,
  postSignUp,
  putMe,
} from '@/apis/auth/auth.api';
import { PROVIDERS, QUERY_KEY_ME } from '@/constants/auth/auth.const';
import type {
  TAuthSignInInputs,
  TAuthSignInResponse,
  TAuthSignUpInputs,
  TMe,
  TPutMeInputs,
  TSignOutResponse,
  TSignOutResponse,
  TSignUpResponse,
} from '@/types/auth/auth.type';
import type { TError } from '@/types/auth/error.type';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/utils/auth/auth-client.util';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const queryClient = useQueryClient();
  return useMutation<TSignUpResponse, TError, TAuthSignUpInputs>({
    mutationFn: postSignUp,
    onSuccess: (data) => {
      setLocalStorageItem('access_token', data.tokens.accessToken);
      setLocalStorageItem('refresh_token', data.tokens.refreshToken);
      queryClient.setQueryData([QUERY_KEY_ME], data.me);
    },
  });
}

export function useSignInMutation(): UseMutationResult<
  TAuthSignInResponse,
  TError,
  TAuthSignInInputs
> {
  const queryClient = useQueryClient();
  return useMutation<TAuthSignInResponse, TError, TAuthSignInInputs>({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      setLocalStorageItem('access_token', data.tokens.accessToken);
      setLocalStorageItem('refresh_token', data.tokens.refreshToken);
      queryClient.setQueryData([QUERY_KEY_ME], data.me);
    },
  });
}

export function useSignOutMutation(): UseMutationResult<TSignOutResponse, TError, void> {
  const queryClient = useQueryClient();
  return useMutation<TSignOutResponse, TError, void>({
    mutationFn: deleteSignOut,
    onSuccess: () => {
      removeLocalStorageItem('access_token');
      queryClient.setQueryData([QUERY_KEY_ME], null);
    },
  });
}

export function usePutMeMutation(): UseMutationResult<TMe, TError, TPutMeInputs> {
export function usePutMeMutation(): UseMutationResult<TMe, TError, TPutMeInputs> {
  const queryClient = useQueryClient();
  return useMutation<TMe, TError, TPutMeInputs>({
  return useMutation<TMe, TError, TPutMeInputs>({
    mutationFn: putMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}

export function useMeQuery(enabled: boolean = true): UseQueryResult<TMe, TError> {
  return useQuery<TMe, TError>({
    queryKey: [QUERY_KEY_ME],
    queryFn: () => getMe(),
    enabled,
  });
}

export function useProviderLoginMutation() {
  return useMutation<{ message: string }, TError, { provider: string; next: string }>({
    mutationFn: ({ provider, next }) => getProviderLogin(provider, next),
  });
}

// me 객체 접근과, 로그아웃을 편리하게 사용하기 위한 훅
export function useAuth() {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState<TError | null>(null);
  const [isMutationPending, setIsMutationPending] = useState(false);
  const { data: me, isLoading: isMeLoading, error: meError } = useMeQuery(enabled);
  const {
    mutate: signOutMutation,
    isPending: isSignOutPending,
    error: signOutError,
  } = useSignOutMutation();
  const {
    mutate: updateMeMutation,
    isPending: isUpdateMePending,
    error: updateMeError,
  } = usePutMeMutation();
  const {
    mutate: providerLogin,
    isPending: isProviderLoginPending,
    error: providerLoginError,
  } = useProviderLoginMutation();

  const loginWithProvider = useCallback(
    (next: string) => {
      providerLogin({ provider: PROVIDERS.kakao, next });
    },
    [providerLogin],
  );

  const signOut = useCallback(() => {
    signOutMutation();
  }, [signOutMutation]);

  const updateMe = useCallback(
    (data: TPutMeInputs) => {
      updateMeMutation(data);
    },
    [updateMeMutation],
  );

  useEffect(() => {
    setEnabled(!!getLocalStorageItem('access_token'));
  }, []);

  useEffect(() => {
    if (!meError && !signOutError && !updateMeError && !providerLoginError) return;
    console.log(meError || signOutError || updateMeError || providerLoginError);
    setError(meError || signOutError || updateMeError || providerLoginError);
  }, [meError, signOutError, updateMeError, providerLoginError]);

  useEffect(() => {
    if (!isSignOutPending && !isUpdateMePending && !isProviderLoginPending) return;
    setIsMutationPending(true);
  }, [isSignOutPending, isUpdateMePending, isProviderLoginPending]);

  // 임시 콘솔 로그
  useEffect(() => {
    console.log('me =====>', me);
  }, [me]);

  return {
    me,
    signOut,
    updateMe,
    loginWithProvider,
    isMeLoading,
    isMutationPending,
    error,
  };
}
