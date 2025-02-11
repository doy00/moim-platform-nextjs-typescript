import { IMoim } from '@/types/mypage/moim.type';

export interface IReview {
  createdAt: string;
  user_image: string;
  rate: 'SOSO' | 'GOOD' | 'RECOMMEND';
  review: string;
  userUuid: string;
  userEmail: string;
  userNickname: string;
  userImage: string;
  moims: IMoim;
}
export interface IReviewPost {
  review: string;
  rate?: 'SOSO' | 'GOOD' | 'RECOMMEND';
}

export interface IReviewResponse {
  message: string;
  data: IReview;
}
