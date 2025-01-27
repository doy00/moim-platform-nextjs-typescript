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
  return api.post<TMe, TMe>(url, data);
};

export const deleteSignOut = () => {
  const url = '/api/auth/signout';
  return api.delete<TSignOutResponse, TSignOutResponse>(url);
};

export const getMe = async () => {
  const url = '/api/auth/me';
  return await api.get<TMe, TMe>(url);
};

export const putMe = (data: TPutMeInputs) => {
  const url = '/api/auth/me';
  return api.put<TMe, TMe>(url, data);
};
