import type {
  TAuthSignInInputs,
  TAuthSignUpInputs,
  TMeResponse,
  TPutMeInputs,
  TSetCookieInputs,
  TSetCookieResponse,
  TSignInResponse,
  TSignUpResponse,
} from '@/types/auth/auth.type';
import api, { apiToRouteHandler } from './axios.api';

export const postSignUp = (data: TAuthSignUpInputs) => {
  const url = '/user/register';

  return api.post<TSignUpResponse, TSignUpResponse>(url, data);
};

export const postSignIn = (data: TAuthSignInInputs) => {
  const url = '/user/login';
  return api.post<TSignInResponse, TSignInResponse>(url, data);
};

export const getMe = async () => {
  const url = '/user/detail';
  const response = await api.get<TMeResponse, TMeResponse>(url);
  return response.data;
};

export const putMe = (data: TPutMeInputs) => {
  const url = '/auth/user';
  return api.put<TMeResponse, TMeResponse>(url, data);
};

export const postSetCookie = (data: TSetCookieInputs) => {
  const url = '/auth/api/set-cookie';
  return apiToRouteHandler.post<TSetCookieResponse, TSetCookieResponse>(url, data);
};

// export const postSignOut = () => {
//   const url = '/auths/signout';
//   return api.post<TSignOutResponse, TSignOutResponse>(url);
// };
