export interface IGathering {
  teamId: number;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string | null;
  createdBy: number;
  canceledAt: string | null;
}

export interface IJoind extends IGathering {
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
}
