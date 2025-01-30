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

// API 기본 응답 타입
export interface IApiResponse<T> {
  isSuccess: boolean;
  message: string;
  status: number;
  data: T;
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

export interface ILikeMoim {
  moimId: number; // 기존 id -> moimId
  moimType: string; // 기존 type -> moimType
  title: string; // 기존 name -> title
  si: string;
  district: string;
  roadAddress: string; // 기존 location -> roadAddress
  startDate: string; // 기존 dateTime -> startDate
  endDate: string; // 기존 registrationEnd -> endDate
  participants: number; // 참가자 수 (동일)
  minParticipants: number;
  maxParticipants: number;
  moimStatus: string; // 기존 status -> moimStatus
  likes?: number; // 좋아요 수
}

export interface Pagination {
  current_page: number;
  total_pages: number;
}
export interface MoimResponse {
  data: ILikeMoim[];
  pagination: Pagination;
}