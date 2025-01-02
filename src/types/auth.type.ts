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
