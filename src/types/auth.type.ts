export type TAuthInputs = {
  email: string;
  name?: string;
  companyName?: string;
  password: string;
  passwordConfirm?: string;
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
  companyName: string;
  image: string;
};

export type TMeResponse = {
  teamId: number | string;
  id: number | string;
  email: string;
  name: string;
  companyName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type TMe = {
  id: number | string;
  email: string;
  name: string;
  companyName: string;
  image: string;
};
