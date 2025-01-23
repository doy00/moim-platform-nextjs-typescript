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

export type TAuthSignUpInputs = TAuthValuesDefault & {
  tags?: string[];
};

export type TSignUpResponse = {
  isSuccess: boolean;
  message: string;
  status: number;
  data: number;
};

export type TSignInResponse = {
  isSuccess: boolean;
  message: string;
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
  };
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

export type TMeResponse = {
  isSuccess: boolean;
  message: string;
  status: number;
  data: {
    email: string;
    nickname: string;
    position: string;
    introduction: string;
    tags: string[];
  };
};

export type TMe = TMeResponse['data'];

export type TSetCookieInputs = {
  accessToken: string;
  refreshToken: string;
};

export type TSetCookieResponse = {
  message: string;
};
