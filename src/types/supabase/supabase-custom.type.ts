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

export type TParticipatedUserClient = {
  userUuid: string;
  userEmail: string;
  userImage: string;
  userNickname: string;
};

export type TReviewClient = {
  userUuid: string;
  review: string;
  rate: ERate;
  userEmail: string;
  userImage: string | null;
  userNickname: string;
};

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
  isConfirmed: boolean;
  likedUsers: string[];
  participatedUsers: TParticipatedUserClient[];
  reviews: TReviewClient[];
};

export type TMoimsJoined = TMoims & {
  reviews: Partial<TReviews>[];
  participated_moims: Partial<TParticipatedMoims>[];
  liked_moims: Partial<TLikedMoims>[];
};

type TReviewParticipatedLikedMoim = {
  reviews: Partial<TReviews>[];
  participated_moims: Partial<TParticipatedMoims>[];
  liked_moims: Partial<TLikedMoims>[];
};

export type TLikedMoimsJoined = TLikedMoims & {
  moims: TMoims & TReviewParticipatedLikedMoim;
};

export type TParticipatedMoimsJoined = TParticipatedMoims & {
  moims: TMoims & TReviewParticipatedLikedMoim;
};

export type TReviewInput = {
  review: string;
  rate: ERate;
};

export type TReviewWithMoim = TReviews & {
  moims: TMoims & TReviewParticipatedLikedMoim;
};

export type TReviewWithMoimClient = TReviewClient & {
  moims: TMoimClient;
};
