export interface IOwnMoim {
  isSuccess: boolean;
  message: string;
  status: number;
  data: {
    moimId: number;
    title: string;
    moimType: string;
    moimStatus: string;
    si: string;
    district: string;
    roadAddress: string;
    startDate: string;
    endDate: string;
    participants: number;
  }[];
}

export interface IMyMoim {
  isSuccess: boolean;
  message: string;
  status: number;
  data: {
    moimId: number;
    title: string;
    moimType: string;
    moimStatus: string;
    si: string;
    district: string;
    roadAddress: string;
    startDate: string;
    endDate: string;
    participants: number;
  }[];
}
