export interface IMoimDetail {
  teamId?: number;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image?: string;
  createdBy: number;
  createdAt: string;
  content: string;
}

export interface IDetailContainer {
  id: number;
  initialData?: {
    detailInfo: IMoimDetail;
    participants: IParticipant[];
    reviews: any[];
  }
}

export interface IParticipant {
  teamId: number;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: IUser;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
}
