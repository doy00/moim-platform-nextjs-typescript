import { Tables } from './supabase';

export type TMoims = Tables<'moims'>;
export type TUsers = Tables<'users'>;
export type TReviews = Tables<'reviews'>;
export type TLikedMoims = Tables<'liked_moims'>;
export type TParticipatedMoims = Tables<'participated_moims'>;

export type TMoimClient = {
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
  moims: TMoims;
};
