import { create } from 'zustand';

type TFilterState = {
  category: string; // 기존 number | null -> string
  region: string; // 기존 string | null -> string
  status: string; // 기존 number | null -> string
  setCategory: (category: string) => void;
  setRegion: (region: string) => void;
  setStatus: (status: string) => void;
  resetFilters: () => void; // 필터 초기화
};

export const useFilterStore = create<TFilterState>((set) => ({
  category: 'all', // 초기값을 상수에 맞게 설정
  region: 'all',
  status: 'all',
  setCategory: (category: string) => set({ category }),
  setRegion: (region: string) => set({ region }),
  setStatus: (status: string) => set({ status }),
  resetFilters: () =>
    set({
      category: 'all',
      region: 'all',
      status: 'all',
    }),
}));
