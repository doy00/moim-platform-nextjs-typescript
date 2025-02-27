export interface IMoim {
  moimId: string;
  moimType: string; 
  title: string; 
  address: string; 
  startDate: string; 
  endDate: string; 
  participants: number; 
  status: string; 
  likes?: number; 
  isConfirmed: boolean;
  recruitmentDeadline: Date | string;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
}
export interface MoimResponse {
  data: IMoim[];
  pagination: Pagination;
}