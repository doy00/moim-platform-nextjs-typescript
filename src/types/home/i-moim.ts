export interface IMoim {
  id: number;
  type: string; 
  name: string; 
  dateTime: string; 
  registrationEnd: string; 
  location: string; 
  participantCount: number; 
  capacity: number; 
  status: string; 
  region: string; 
  image?: string;
  confirmed?: boolean; 
  likes?: number;
}