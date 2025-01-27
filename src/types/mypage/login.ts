export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  isSuccess: boolean;
  message: string;
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
