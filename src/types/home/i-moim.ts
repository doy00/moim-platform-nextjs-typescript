export interface IMoim {
  moimId: number; // 기존 id -> moimId
  moimType: string; // 기존 type -> moimType
  title: string; // 기존 name -> title
  roadAddress: string; // 기존 location -> roadAddress
  startDate: string; // 기존 dateTime -> startDate
  endDate: string; // 기존 registrationEnd -> endDate
  participants: number; // 참가자 수 (동일)
  moimStatus: string; // 기존 status -> moimStatus
  likes?: number; // 좋아요 수
}

export interface Pagination {
  current_page: number;
  total_pages: number;
}
export interface MoimResponse {
  data: IMoim[];
  pagination: Pagination;
}