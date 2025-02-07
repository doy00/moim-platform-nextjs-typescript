import { IReview } from './reviews.type';
import { IParticipatedUser } from './user';

export interface IMoim {
  moimId: string;
  title: string;
  content: string;
  address: string;
  isConfirmed: boolean;
  recruitmentDeadline: Date;
  startDate: Date;
  endDate: Date;
  minParticipants: number;
  maxParticipants: number;
  moimType: 'PROJECT' | 'STUDY' | 'INTERVIEW';
  status: 'RECRUIT' | 'PROGRESS' | 'END';
  likes: number;
  participants: number;
  reviewsCount: number;
  participantsMoims: [];
  participatedUsers: IParticipatedUser[];
  reviews: IReview[];
}

export interface IMyMoim extends IMoim {
  isOwner?: boolean;
}

export interface IParticipatedMoim extends IMoim {
  isParticipated: boolean;
}

export interface IMoimLikeyResponse {
  message: string;
  data: IMoim;
}
