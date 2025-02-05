export type TFilterState = {
  moimType: string;
  region: string[];
  status: string;
  sortOrder: 'LATEST' | 'LIKES' | 'DEADLINE';
  isConfirmed: boolean | null;
  moimStatus: null; // 잘 모르겠어서 임시로 null 로 설정했습니다.
  setSortOrder: (sortOrder: 'LATEST' | 'LIKES' | 'DEADLINE') => void;
  setMoimType: (moimType: string) => void;
  setStatus: (status: string) => void;
  toggleRegion: (region: string) => void;
  toggleConfirmed: () => void;
  resetFilters: () => void;
};
