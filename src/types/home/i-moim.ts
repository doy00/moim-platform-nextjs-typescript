export interface IMoim {
  moimId: string; // 기존 id -> moimId
  moimType: string; // 기존 type -> moimType
  title: string; // 기존 name -> title
  address: string; // 기존 location -> address
  startDate: string; // 기존 dateTime -> startDate
  endDate: string; // 기존 registrationEnd -> endDate
  participants: number; // 참가자 수 (동일)
  status: string; // 기존 moimStatus -> status (RECRUIT, PROGRESS, END)
  likes?: number; // 좋아요 수
  isConfirmed: boolean;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
}
export interface MoimResponse {
  data: IMoim[];
  pagination: Pagination;
}