export interface IUser {
  created_at: string;
  email: string;
  id: string;
  image: string | null;
  introduction: string | null;
  nickname: string;
  position: string;
  tags: string[] | null;
  updated_at: string;
}

export interface IUserEdit {
  email: string;
  password: string;
  nickname: string;
  position: string;
  introduction: string;
  tags: string[];
}

export interface IEditUserResponse {
  created_at: string;
  email: string;
  id: string;
  image: string | null;
  introduction: string | null;
  nickname: string;
  position: string;
  tags: string[] | null;
  updated_at: string;
}
