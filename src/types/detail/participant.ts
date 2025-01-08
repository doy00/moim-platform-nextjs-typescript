// 기본 User 타입을 별도로 분리
interface IUser {
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
}

export interface IParticipant {
  teamId: number;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: IUser;
}

// 컴포넌트에서 사용할 Props 타입
export interface IDetailParticipants {
  participants: IParticipant[];
  className?: string;
}