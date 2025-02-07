export type TFilterState = {
  moimType: string;
  onoff: 'all' | 'online' | 'offline';
  status: string;
  sortOrder: 'LATEST' | 'LIKES' | 'DEADLINE';
  isConfirmed: boolean | null;
  setMoimType: (moimType: string) => void;
  setOnOff: (onoff: 'all' | 'online' | 'offline') => void;
  setStatus: (status: string) => void;
  setSortOrder: (sortOrder: 'LATEST' | 'LIKES' | 'DEADLINE') => void;
  toggleConfirmed: () => void;
  resetFilters: () => void;
};
