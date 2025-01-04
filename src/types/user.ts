export interface IUser {
  teamId: string;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
