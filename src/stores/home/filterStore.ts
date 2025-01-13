import { create } from 'zustand';
import { TFilterState } from '@/types/home/t-filterState';

export const useFilterStore = create<TFilterState>((set) => ({
  category: 'all', // 초기값을 상수에 맞게 설정
  region: [],
  status: 'all',
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
  resetFilters: () =>
    set({
      category: 'all',
      region: [],
      status: 'all',
    }),
}));
