export type TFilterState = {
  category: string; // 기존 number | null -> string
  region: string[]; // 기존 string | null -> string
  status: string; // 기존 number | null -> string
  setCategory: (category: string) => void;
  setStatus: (status: string) => void;
  toggleRegion: (region: string) => void; // 선택된 지역 토글
  resetFilters: () => void; // 필터 초기화
};