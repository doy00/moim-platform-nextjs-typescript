// types/detail/t-user.ts

import { TUsers } from "../supabase/supabase-custom.type";

export interface IUser extends TUsers {
  isLoggedIn?: boolean;
}

export interface IAuthResponse {
  user: IUser;
  session: {
    access_token: string;
    expires_at: number;
  };
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegistrationData extends ILoginCredentials {
  nickname: string;
  position: 'BACKEND' | 'FRONTEND' | 'PM' | 'DESIGNER';
  introduction?: string;
  tags?: string[];
}