import { create } from 'zustand';
import { TFilterState } from '@/types/home/t-filterState';

export const useFilterStore = create<TFilterState>((set) => ({
  moimType: 'all', // 초기값을 'all'로 설정
  region: ['all'], // 초기값을 'all'로 설정
  moimStatus: 'all', // 초기값
  sortOrder: 'latest', // 초기 정렬값
  confirmed: undefined,
  setSortOrder: (sortOrder: 'latest' | 'likes' | 'deadline') => set({ sortOrder }),
  setMoimType: (moimType: string) => set({ moimType }),
  toggleRegion: (region: string) =>
    set((state) => {
      if (region === 'all') {
        return { region: ['all'] }; // 'all' 선택 시 다른 지역 초기화
      }

      const isSelected = state.region.includes(region);
      const newRegions = isSelected
        ? state.region.filter((r) => r !== region) // 선택된 지역 제거
        : [...state.region.filter((r) => r !== 'all'), region]; // 'all' 제외 후 추가

      return { region: newRegions.length > 0 ? newRegions : ['all'] }; // 최소값 보장
    }),
  setMoimStatus: (moimStatus: string) => set({ moimStatus }),
  toggleConfirmed: () =>
    set((state) => ({ confirmed: state.confirmed === undefined ? true : undefined })),
  resetFilters: () =>
    set({
      moimType: 'all',
      region: ['all'],
      moimStatus: 'all',
      sortOrder: 'latest',
    }),
}));
