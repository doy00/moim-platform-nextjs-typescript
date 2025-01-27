export interface IUser {
  isSuccess: boolean;
  message: string;
  status: number;
  data: {
    id: number;
    nickname: string;
    position: string;
    introduction: string;
    tags: string[];
    image: string;
    email: string;
  };
}
