import { TAuthInputs } from '@/types/auth/auth.type';
import api from '../axios.api';

export const postSignUp = (data: TAuthInputs) => {
  const url = '/auths/signup';
  return api.post(url, data);
};
