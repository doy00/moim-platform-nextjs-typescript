export type TFilterState = {
  moimType: string; // 기존 category -> moimType
  region: string[]; // 지역 필터
  moimStatus: string; // 기존 status -> moimStatus
  sortOrder: 'latest' | 'likes' | 'deadline'; // 정렬 옵션
  confirmed: boolean | undefined;

  // 상태 변경 함수
  setSortOrder: (sortOrder: 'latest' | 'likes' | 'deadline') => void;
  setMoimType: (moimType: string) => void;
  setMoimStatus: (moimStatus: string) => void;
  toggleRegion: (region: string) => void;
  toggleConfirmed: () => void;
  resetFilters: () => void; // 필터 초기화
};
