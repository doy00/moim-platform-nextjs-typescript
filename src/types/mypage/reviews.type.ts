export interface IReview {
  created_at: string;
  updated_at: string;
  id: string;
  moim_uuid: string;
  rate: 'SOSO' | 'GOOD' | 'RECOMMEND';
  review: string;
  user_uuid: string;
}
export interface IReviewPost {
  review: string;
  rate: 'SOSO' | 'GOOD' | 'RECOMMEND';
}
