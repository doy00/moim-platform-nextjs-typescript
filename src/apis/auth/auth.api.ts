import { TAuthInputs } from '@/types/auth.type';
import api from '../axios.api';

export const postSignUp = (data: TAuthInputs) => {
  const url = '/auths/signup';
  return api.post(url, data);
};
