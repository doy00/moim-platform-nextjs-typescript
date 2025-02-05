// types/detail/t-moims.ts
import { TMoimClient, ERate, ECategory, EMoimStatus,TParticipatedUserClient, TReviewClient } from "../supabase/supabase-custom.type";

// 모임 상세  (새로운 구조에 맞게 수정)
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
  moimType: ECategory;
  status: EMoimStatus;
  likes: number;
  participants: number;
  reviewsCount: number;
  isConfirmed: boolean;
  online: boolean;
  likedUsers: string[];
  participatedUsers: TParticipatedUserClient[];
  reviews: TReviewClient[];
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

// 참여자 (새로운 구조에 맞게 수정)
export interface IParticipant {
  userUuid: string;
  userEmail: string;
  userImage: string | null;
  userNickname: string;
}

// 리뷰 (새로운 구조에 맞게 수정)
export interface IReview {
  userUuid: string;
  review: string;
  rate: ERate;
  userEmail: string;
  userImage: string | null;
  userNickname: string;
}

// 찜 토글 응답 (새로운 구조에 맞게 수정)
export interface ILikeResponse {
  message: string;
  data: {
    moimId: string;
    likes: number;
  };
}

// 내가 찜한 목록 응답 (새로운 구조에 맞게 수정)
export interface ILikedMoimsResponse {
  data: TMoimClient[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

// 모임 상세
// export interface IMoimDetail {
//   moimId: string;
//   title: string;
//   content: string;
//   address: string;
//   recruitmentDeadline: string;
//   startDate: string;
//   endDate: string;
//   minParticipants: number;
//   maxParticipants: number;
//   moimType: ECategory;     
//   status: EMoimStatus;    
//   likes: number;
//   participants: number;
//   reviewsCount: number;
//   participantsMoims: IParticipant[];
//   reviews: IReviewWithUser[];
// }

// 참여자
// export interface IParticipant extends TParticipatedMoims {
//   id: string;
//   nickname: string;
//   image?: string | null;
//   position: EPosition;
// }


// 리뷰
// export interface IReview extends TReviews {
//   id: string;
//   rate: ERate;           // Enum 타입 사용
//   review: string;
//   user_uuid: string;
//   moim_uuid: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface IReviewWithUser extends IReview {
//   users: TUsers;
// }

// 찜 토글 응답
// export interface ILikeResponse {
//   message: string;
//   data: {
//     moimId: string;
//     likes: number;
//   };
// }

// 내가 찜한 목록 응답(변경후)
// export interface MyLikesListResponse {
//   // data: TMoimsJoined[];
//   data: TLikedMoims[];
//   pagination: {
//     totalItems: number;
//     totalPages: number;
//     currentPage: number;
//   };
// }
