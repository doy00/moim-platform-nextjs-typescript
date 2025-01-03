import { getMe, postSignIn, postSignOut, postSignUp, putMe } from '@/apis/auth.api';
import { QUERY_KEY_ME } from '@/constants/auth.const';
import type {
  TAuthInputs,
  TMeResponse,
  TPutMeInputs,
  TSignInResponse,
  TSignOutResponse,
  TSignUpResponse,
} from '@/types/auth.type';
import type { TError } from '@/types/error.type';
import { deleteCookie, setCookie } from '@/utils/auth-server.util';
import { removeItem, setItemWithExpireTime } from '@/utils/auth.util';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useSignUpMutation(): UseMutationResult<TSignUpResponse, TError, TAuthInputs> {
  const queryClient = useQueryClient();
  return useMutation<TSignUpResponse, TError, TAuthInputs>({
    mutationFn: postSignUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}

export function useSignInMutation(): UseMutationResult<TSignInResponse, TError, TAuthInputs> {
  const queryClient = useQueryClient();
  return useMutation<TSignInResponse, TError, TAuthInputs>({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      setItemWithExpireTime('dudemeet-token', data.token, 1000 * 60 * 60);
      setCookie({
        name: 'dudemeet-token',
        value: data.token,
        maxAge: 60 * 60,
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
      removeItem('dudemeet-token');
      deleteCookie('dudemeet-token');
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

export function useMeQuery(): UseQueryResult<TMeResponse, TError> {
  return useQuery<TMeResponse, TError>({
    queryKey: [QUERY_KEY_ME],
    queryFn: getMe,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60,
  });
}
