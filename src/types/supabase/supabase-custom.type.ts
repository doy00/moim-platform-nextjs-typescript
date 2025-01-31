import { Enums, Tables } from './supabase';

export type TMoims = Tables<'moims'>;
export type TUsers = Tables<'users'>;
export type TReviews = Tables<'reviews'>;
export type TLikedMoims = Tables<'liked_moims'>;
export type TParticipatedMoims = Tables<'participated_moims'>;

export type ERate = Enums<'review_status'>;
export type ECategory = Enums<'moim_category'>;
export type EMoimStatus = Enums<'moim_status'>;
export type EPosition = Enums<'user_position'>;

export type TMoimClient = {
  moimId: string;
  title: string;
  content: string;
  address: string;
  recruitmentDeadline: string;
  startDate: string;
  endDate: string;
  minParticipants: number;
  maxParticipants: number;
  moimType: string;
  status: string;
  likes: number;
  participants: number;
  reviewsCount: number;
};

export type TMoimsJoined = TMoims & {
  reviews: TReviews[];
  participated_moims: TParticipatedMoims[];
  liked_moims?: TLikedMoims[];
};

export type TLikedMoimsJoined = TLikedMoims & {
  moims: TMoims & {
    reviews: TReviews[];
    participated_moims: TParticipatedMoims[];
  };
};

export type TParticipatedMoimsJoined = TParticipatedMoims & {
  moims: TMoims & {
    reviews: TReviews[];
    participated_moims: TParticipatedMoims[];
  };
};

export type TReviewInput = {
  review: string;
  rate: ERate;
};

export type TReviewWithMoim = TReviews & {
  moims: TMoims;
};
