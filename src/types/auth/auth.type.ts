import { EPosition, TUsers } from '../supabase/supabase-custom.type';

export type TTags = {
  id?: string;
  value: string;
};

type TAuthValuesDefault = {
  email: string;
  nickname: string;
  position: EPosition;
  password: string;
  passwordConfirm?: string;
  introduction?: string;
};

export type TAuthFormValues = TAuthValuesDefault & {
  tags?: TTags[];
};

export type TAuthSignInInputs = {
  email: string;
  password: string;
};

export type TSignOutResponse = {
  message: string;
};

export type TPutMeInputs = {
  nickname: string;
  introduction?: string;
  position?: EPosition;
  tags?: string[];
};

export type TMe = Omit<TUsers, 'created_at' | 'updated_at'>;

export type TAuthSignUpInputs = Omit<TMe, 'id' | 'image'> & {
  password: string;
};

export type TSignUpResponse = {
  me: TMe;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export type TAuthSignInResponse = {
  me: TMe;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
