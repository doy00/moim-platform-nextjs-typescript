// types/detail/t-moims.ts
import { TReviews, TParticipatedMoims, TMoimClient, ERate, ECategory, EMoimStatus, EPosition, TUsers} from "../supabase/supabase-custom.type";

// 모임 상세
export interface IMoimDetail {
  moimId: string;
  title: string;
  content: string;
  address: string;
  recruitmentDeadline: string;
  startDate: string;
  endDate: string;
  minParticipants: number;
  maxParticipants: number;
  moimType: ECategory;           // Enum 타입 사용
  status: EMoimStatus;           // Enum 타입 사용
  likes: number;
  participants: number;
  reviewsCount: number;
  participantsMoims: IParticipant[];
  reviews: IReviewWithUser[];
}

// 모임 목록 응답
export interface IMoimListResponse {
  data: TMoimClient[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// 참여자
export interface IParticipant extends TParticipatedMoims {
  id: string;
  nickname: string;
  image?: string | null;
  position: EPosition;
}

// 리뷰
export interface IReview extends TReviews {
  id: string;
  rate: ERate;           // Enum 타입 사용
  review: string;
  user_uuid: string;
  moim_uuid: string;
  created_at: string;
  updated_at: string;
}

export interface IReviewWithUser extends IReview {
  users: TUsers;
}