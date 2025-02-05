import { IMoim } from '@/types/mypage/moim.type';

export interface IReview {
  rate: 'SOSO' | 'GOOD' | 'RECOMMEND';
  review: string;
  userUuid: string;
  userEmail: string;
  userNickname: string;
  moim: IMoim;
}
export interface IReviewPost {
  review: string;
  rate: 'SOSO' | 'GOOD' | 'RECOMMEND';
}
