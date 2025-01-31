import type {
  TAuthSignInInputs,
  TAuthSignInResponse,
  TAuthSignUpInputs,
  TMe,
  TPutMeInputs,
  TSignOutResponse,
  TSignUpResponse,
} from '@/types/auth/auth.type';
import api from './axios.api';

export const postSignUp = (data: TAuthSignUpInputs) => {
  const url = '/api/auth/register';
  return api.post<TSignUpResponse, TSignUpResponse>(url, data);
};

export const postSignIn = (data: TAuthSignInInputs) => {
  const url = '/api/auth/signin';
  return api.post<TAuthSignInResponse, TAuthSignInResponse>(url, data);
};

export const deleteSignOut = () => {
  const url = '/api/auth/signout';
  return api.delete<TSignOutResponse, TSignOutResponse>(url);
};

export const getMe = async (jwt?: string) => {
  let url = '/api/auth/me';
  if (jwt) url = `/api/auth/me?jwt=${jwt}`;
  return await api.get<TMe, TMe>(url);
};

export const putMe = (data: TPutMeInputs) => {
  const url = '/api/auth/me';
  return api.put<TMe, TMe>(url, data);
};

export const getProviderLogin = (provider: string, next?: string) => {
  const url = `/api/auth/provider?provider=${provider}&next=${next}`;
  return api.get<{ message: string }, { message: string }>(url);
};
