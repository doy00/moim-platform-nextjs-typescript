export type TFilterState = {
  category: string; 
  region: string[]; 
  status: string; 
  confirmed: boolean | undefined; 
  sortOrder: "latest" | "likes" | "deadline"; // 추가

  setSortOrder: (sortOrder: "latest" | "likes" | "deadline") => void; // 추가
  setCategory: (category: string) => void;
  setStatus: (status: string) => void;
  toggleRegion: (region: string) => void; 
  toggleConfirmed: () => void;
  resetFilters: () => void; 
};