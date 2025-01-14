import { create } from 'zustand';
import { TFilterState } from '@/types/home/t-filterState';

export const useFilterStore = create<TFilterState>((set) => ({
  category: 'all', // 초기값을 상수에 맞게 설정
  region: [],
  status: 'all',
  confirmed: undefined, // 초기값: false
  sortOrder: "latest",
  setSortOrder: (sortOrder: "latest" | "likes" | "deadline") => set({ sortOrder }), // 추가
  setCategory: (category: string) => set({ category }),
  toggleRegion: (region: string) =>
    set((state) => {
      if (region === 'all') {
        return { region: ['all'] };
      }

      const isSelected = state.region.includes(region);
      const newRegions = isSelected
        ? state.region.filter((r) => r !== region) 
        : [...state.region.filter((r) => r !== 'all'), region]; 

      return { region: newRegions.length > 0 ? newRegions : ['all'] };
    }),
  setStatus: (status: string) => set({ status }),
  toggleConfirmed: () =>
    set((state) => {
      const newState = state.confirmed === undefined ? true : undefined; // 토글 동작
      console.log('Switch 상태 업데이트:', newState); // 디버깅 로그
      return { confirmed: newState };
    }),
  resetFilters: () =>
    set({
      category: 'all',
      region: [],
      status: 'all',
      confirmed: undefined,
      sortOrder: "latest",
    }),
}));
