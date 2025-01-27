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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}

export function useSignInMutation(): UseMutationResult<TMe, TError, TAuthSignInInputs> {
  const queryClient = useQueryClient();
  return useMutation<TMe, TError, TAuthSignInInputs>({
    mutationFn: postSignIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}

export function useSignOutMutation(): UseMutationResult<TSignOutResponse, TError, void> {
  const queryClient = useQueryClient();
  return useMutation<TSignOutResponse, TError, void>({
    mutationFn: deleteSignOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
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

interface AuthProviderQueryProps {
  provider: string;
  isStart: boolean;
  next?: string;
}

export function useProviderLoginQuery({ provider, isStart, next }: AuthProviderQueryProps) {
  return useQuery<{ message: string }, TError>({
    queryKey: [QUERY_KEY_ME, provider, next],
    queryFn: () => getProviderLogin(provider, next),
    enabled: !!provider && isStart,
  });
}

interface UseAuthProps {
  enabled?: boolean;
}

type TProviderLoginState = {
  provider: string;
  next: string;
  isStart: boolean;
};

// me 객체 접근과, 로그아웃을 편리하게 사용하기 위한 훅
export function useAuth(props?: UseAuthProps) {
  const { enabled = true } = props || {};
  const [isMutationPending, setIsMutationPending] = useState(false);
  const [providerLoginState, setProviderLoginState] = useState<TProviderLoginState>({
    provider: '',
    next: '',
    isStart: false,
  });
  const { data: me, isLoading: isMeLoading, error: meError } = useMeQuery(enabled);
  const {
    mutate: signOut,
    isPending: isSignOutPending,
    error: signOutError,
  } = useSignOutMutation();
  const {
    mutate: updateMe,
    isPending: isUpdateMePending,
    error: updateMeError,
  } = usePutMeMutation();
  const {
    data: providerLoginData,
    isPending: isProviderLoginPending,
    error: providerLoginError,
  } = useProviderLoginQuery({
    ...providerLoginState,
    isStart: providerLoginState.isStart,
  });

  const loginWithProvider = useCallback((next: string) => {
    setProviderLoginState((prev) => ({
      ...prev,
      provider: PROVIDERS.kakao,
      next,
      isStart: true,
    }));
  }, []);

  useEffect(() => {
    if (!meError && !signOutError && !updateMeError && !providerLoginError) return;
    console.log(meError || signOutError || updateMeError || providerLoginError);
  }, [meError, signOutError, updateMeError, providerLoginError]);

  useEffect(() => {
    if (!isSignOutPending && !isUpdateMePending && !isProviderLoginPending) return;
    setIsMutationPending(true);
  }, [isSignOutPending, isUpdateMePending, isProviderLoginPending]);

  useEffect(() => {
    if (!providerLoginData) return;
    if (providerLoginData.message === '로그인 성공') {
      setProviderLoginState((prev) => ({
        ...prev,
        isStart: false,
      }));
    }
  }, [providerLoginData]);

  return { me, signOut, updateMe, loginWithProvider, isMeLoading, isMutationPending };
}
