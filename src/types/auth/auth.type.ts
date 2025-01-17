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
  message: string;
};

export type TSignInResponse = {
  token: string;
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
  teamId: number | string;
  id: number | string;
  email: string;
  nickname: string;
  position: string;
  introduction: string;
  tags: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
};
