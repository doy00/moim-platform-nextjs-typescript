import type {
  TAuthSignInInputs,
  TAuthSignUpInputs,
  TMeResponse,
  TPutMeInputs,
  TSignInResponse,
  TSignOutResponse,
  TSignUpResponse,
} from '@/types/auth/auth.type';
import api from './axios.api';

export const postSignUp = (data: TAuthSignUpInputs) => {
  const url = '/auths/signup';
  return api.post<TSignUpResponse, TSignUpResponse>(url, data);
};

export const postSignIn = (data: TAuthSignInInputs) => {
  const url = '/auths/signin';
  return api.post<TSignInResponse, TSignInResponse>(url, data);
};

export const postSignOut = () => {
  const url = '/auths/signout';
  return api.post<TSignOutResponse, TSignOutResponse>(url);
};

export const getMe = () => {
  const url = '/auths/user';
  return api.get<TMeResponse, TMeResponse>(url);
};

export const putMe = (data: TPutMeInputs) => {
  const url = '/auths/user';
  return api.put<TMeResponse, TMeResponse>(url, data);
};
