export type TFilterState = {
  moimType: string;
  region: string[];
  status: string;
  sortOrder: 'LATEST' | 'LIKES' | 'DEADLINE';
  isConfirmed: boolean | null;
  setSortOrder: (sortOrder: 'LATEST' | 'LIKES' | 'DEADLINE') => void;
  setMoimType: (moimType: string) => void;
  setStatus: (status: string) => void;
  toggleRegion: (region: string) => void;
  toggleConfirmed: () => void;
  resetFilters: () => void;
};
