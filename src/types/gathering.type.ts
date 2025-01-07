export interface IGathering {
  teamId: number;
  id: number;
  type: string;
  name: string;
  dateTime: Date;
  registrationEnd: Date;
  location: string;
  participantCount: number;
  capacity: number;
  image: string | null;
  createdBy: number;
  canceledAt: Date | null;
}

// export interface IGatheringResponse {
//   gatherings: IGathering[];
// }
