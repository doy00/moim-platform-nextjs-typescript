export interface IUser {
  created_at: string;
  email: string;
  id: string;
  image: string | null;
  introduction: string | null;
  is_social: boolean;
  nickname: string;
  position: string | undefined;
  tags: string[] | null;
  updated_at: string;
}

export interface IMeJsonData {
  email: string;
  // password: string;
  nickname: string;
  position: string;
  introduction: string;
  tags: string[];
}

export interface IUserEdit {
  email: string;
  // password: string;
  nickname: string;
  position: string;
  introduction: string;
  tags: string[];
  image?: File;
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

export interface IMeJsonData {
  email: string;
  // password: string;
  nickname: string;
  position: string;
  introduction: string;
  tags: string[];
}

export interface IParticipatedUser {
  userEmail: string;
  userImage: string;
  userNickname: string;
  userUuid: string;
}
