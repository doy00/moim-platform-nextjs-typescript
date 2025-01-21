// types/detail/i-moim.ts
export interface IMoimReview {
  nickname: string;
  contents: string;
  emotion: string;
  createdAt: string;
}

export interface IMoimDetail {
  moimId: number;
  title: string;
  content: string;
  moimType: string;
  moimStatus: string;
  si: string;
  district: string;
  roadAddress: string;
  startDate: string;
  endDate: string;
  participants: number;
  minParticipants: number;
  maxParticipants: number;
  reviews: IMoimReview[];
  image: string;     // [ ] 현재 api에 이미지 없음
}
export interface IDetailInfoAPIResponse {
  title: string;
  location: string;
  recruitmentPeriod: string;
  meetingDate: string;
  className?: string;
  image?: string;
  participants: number;
  minParticipants: number;
}

export interface ApiDetailResponse {
  isSuccess: boolean;
  message: string;
  status: number;
  data: IMoimDetail;
}

export interface IDetailContainer {
  id: number;
  initialData?: {
    detailInfo: IMoimDetail;
    participants: IParticipant[];
    reviews: any[];
  }
}

export interface IParticipant {
  teamId: number;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: IUser;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
}
