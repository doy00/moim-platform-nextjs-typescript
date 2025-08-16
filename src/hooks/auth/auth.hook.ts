'use client';

// import {
//   deleteSignOut,
//   getMe,
//   getProviderLogin,
//   postSignIn,
//   postSignUp,
//   putMe,
// } from '@/apis/auth/auth.api';
import { mockAuth } from '@/utils/mockAuth';
import { QUERY_KEY_ME } from '@/constants/auth/auth.const';
import type {
  TAuthSignInInputs,
  TAuthSignInResponse,
  TAuthSignUpInputs,
  TMe,
  TPutMeInputs,
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
    mutationFn: (data) => mockAuth.signUp(data.email, data.password, data),
    onSuccess: (data) => {
      setLocalStorageItem('access_token', data.tokens.accessToken);
      setLocalStorageItem('refresh_token', data.tokens.refreshToken);
      queryClient.setQueryData([QUERY_KEY_ME], data.me);
      queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
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
    mutationFn: (data) => mockAuth.signIn(data.email, data.password),
    onSuccess: (data) => {
      setLocalStorageItem('access_token', data.tokens.accessToken);
      setLocalStorageItem('refresh_token', data.tokens.refreshToken);
      queryClient.setQueryData([QUERY_KEY_ME], data.me);
      queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
    },
  });
}

export function useSignOutMutation(): UseMutationResult<TSignOutResponse, TError, void> {
  const queryClient = useQueryClient();
  return useMutation<TSignOutResponse, TError, void>({
    mutationFn: () => mockAuth.signOut(),
    onSuccess: () => {
      removeLocalStorageItem('access_token');
      removeLocalStorageItem('refresh_token');
      queryClient.setQueryData([QUERY_KEY_ME], null);
      queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
    },
  });
}

export function usePutMeMutation(): UseMutationResult<TMe, TError, TPutMeInputs> {
  const queryClient = useQueryClient();
  return useMutation<TMe, TError, TPutMeInputs>({
    mutationFn: (data) => Promise.resolve({ ...mockAuth.getCurrentUser(), ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}

export function useMeQuery(enabled: boolean = true): UseQueryResult<TMe | null, TError> {
  return useQuery<TMe | null, TError>({
    queryKey: [QUERY_KEY_ME],
    queryFn: () => {
      // 토큰이 있으면 사용자 정보 반환, 없으면 null 반환
      const token = getLocalStorageItem('access_token');
      return token ? mockAuth.getCurrentUser() : Promise.resolve(null);
    },
    enabled,
  });
}

export function useProviderLoginQuery({ provider, next }: { provider: string; next: string }) {
  return useQuery<{ message: string }, TError, { provider: string; next: string }>({
    queryKey: [QUERY_KEY_ME, provider, next],
    queryFn: () => Promise.resolve({ message: 'Mock provider login' }),
    enabled: !!provider && !!next,
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
    if (!meError && !signOutError && !updateMeError) return;
    if (meError?.message === '쿠키, 토큰이 유효하지 않습니다. 다시 로그인 하세요.') {
      removeLocalStorageItem('access_token');
      removeLocalStorageItem('refresh_token');
    }
    console.log(meError || signOutError || updateMeError);
    setError(meError || signOutError || updateMeError);
  }, [meError, signOutError, updateMeError]);

  useEffect(() => {
    if (!isSignOutPending && !isUpdateMePending) return;
    setIsMutationPending(true);
  }, [isSignOutPending, isUpdateMePending]);

  // 임시 콘솔 로그
  // useEffect(() => {
  //   console.log('me =====>', me);
  // }, [me]);

  return {
    me,
    signOut,
    updateMe,
    isMeLoading,
    isMutationPending,
    error,
  };
}
