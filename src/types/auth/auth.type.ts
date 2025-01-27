import { TUsers } from '../supabase/supabase-custom.type';

export type TTags = {
  id: number;
  value: string;
};

type TAuthValuesDefault = {
  email: string;
  nickname: string;
  position: string;
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

export type TSignUpResponse = {
  message: string;
};

export type TSignOutResponse = {
  message: string;
};

export type TPutMeInputs = {
  nickname: string;
  image: string;
  introduction?: string;
  position?: string;
  tags?: string[];
};

export type TMe = Omit<TUsers, 'created_at' | 'updated_at'>;

export type TAuthSignUpInputs = Omit<TMe, 'id' | 'image'> & {
  password: string;
};
