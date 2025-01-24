// types/detail/i-moim.ts

export interface IMoimDetail {
  className?: string;
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
  participants: number;   // [ ] 실제 참가자 배열 추가 예정, 참가인원수 별도 
  minParticipants: number;
  maxParticipants: number;
  reviews: IMoimReview[];
  image: string;
}

export interface IMoimReview {
  nickname: string;
  contents: string;
  emotion: ReviewEmotion;
  createdAt: string;
}

export type ReviewEmotion = '그냥그래요' | '괜찮아요' | '추천해요';

export interface IDetailReviewComponent {
  reviews: IMoimReview[];  // 배열
  className?: string;
}

export interface IReviewItem {
  review: IMoimReview;    // 단일 객체
  className?: string;
}

export interface IDetailReviewResponse {
  data: IMoimReview[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
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
