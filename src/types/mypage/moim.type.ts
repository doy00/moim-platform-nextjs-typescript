export interface IMoim {
  moimId: string;
  title: string;
  content: string;
  address: string;
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
  reviews: [];
}

export interface IMyMoim extends IMoim {
  isOwner: boolean;
}

export interface IParticipatedMoim extends IMoim {
  isParticipated: boolean;
}
