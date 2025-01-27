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
  // const url = '/user/register';
  const url = '/auth/api/user/register';

  return api.post<TSignUpResponse, TSignUpResponse>(url, data);
};

export const postSignIn = (data: TAuthSignInInputs) => {
  // const url = '/user/login';
  const url = '/auth/api/user/login';
  return api.post<TSignInResponse, TSignInResponse>(url, data);
};

export const postSignOut = () => {
  const url = '/auths/signout';
  return api.post<TSignOutResponse, TSignOutResponse>(url);
};

export const getMe = async () => {
  // const url = '/user/detail';
  const url = '/auth/api/user/detail';
  const response = await api.get<TMeResponse, TMeResponse>(url);
  return response.data;
};

export const putMe = (data: TPutMeInputs) => {
  const url = '/auths/user';
  return api.put<TMeResponse, TMeResponse>(url, data);
};
