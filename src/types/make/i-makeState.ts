interface IMakeState {
  type: string; 
  title: string;
  content: string;
  si: string;
  district: string;
  roadAddress: string;
  isOnline: boolean;
  recruitmentDeadline: string;
  startDate: string;
  endDate: string;
  minParticipants: number;
  maxParticipants: number;
  image: File | null; // File | null
}

export interface MakeStoreState extends IMakeState {
  setType: (type: string) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSi: (si: string) => void;
  setDistrict: (district: string) => void;
  setRoadAddress: (roadAddress: string) => void;
  toggleOnline: () => void;
  setRecruitmentDeadline: (recruitmentDeadline: string) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setMinParticipants: (minParticipants: number) => void;
  setMaxParticipants: (maxParticipants: number) => void;
  setImage: (image: File | null) => void;
  reset: () => void;
}
