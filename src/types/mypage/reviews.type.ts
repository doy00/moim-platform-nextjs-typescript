import { IMoim } from '@/types/mypage/moim.type';

export interface IReview {
  // TODO : 작성날짜 필요함
  created_at: string;
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
  rate: 'SOSO' | 'GOOD' | 'RECOMMEND';
}
