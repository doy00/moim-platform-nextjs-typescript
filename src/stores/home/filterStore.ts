import { create } from 'zustand';
import { TFilterState } from '@/types/home/t-filterState';

export const useFilterStore = create<TFilterState>((set) => ({
  moimType: 'all', // 기본값: 모든 카테고리 (소문자 유지)
  region: ['all'], // 기본값: 모든 지역 (소문자 유지)
  status: 'all', // 기본값: 모든 상태 (소문자 유지)
  sortOrder: 'LATEST', // 기본값: 최신순
  isConfirmed: null, // ✅ 기본값을 `null`로 설정 (초기엔 모든 데이터)

  // ✅ 정렬 방식 설정 (소문자 'all' 제외)
  setSortOrder: (sortOrder: string) => {
    const formattedSortOrder = sortOrder === 'LATEST' ? 'LATEST' : sortOrder.toUpperCase();
    console.log('🛠 [setSortOrder]:', formattedSortOrder);
    set({ sortOrder: formattedSortOrder });
  },

  // ✅ 모임 카테고리 설정 (소문자 'all' 제외)
  setMoimType: (moimType: string) => {
    const formattedMoimType = moimType === 'all' ? 'all' : moimType.toUpperCase();
    console.log('🛠 [setMoimType]:', formattedMoimType);
    set({ moimType: formattedMoimType });
  },

  // ✅ 모임 상태 설정 (소문자 'all' 제외)
  setStatus: (status: string) => {
    const formattedStatus = status === 'all' ? 'all' : status.toUpperCase();
    console.log('🛠 [setStatus]:', formattedStatus);
    set({ status: formattedStatus });
  },

  // ✅ 지역 필터링 토글
  toggleRegion: (region: string) =>
    set((state) => {
      if (region === 'all') {
        console.log('🛠 [toggleRegion]: all 지역 선택됨');
        return { region: ['all'] };
      }

      const isSelected = state.region.includes(region);
      const newRegions = isSelected
        ? state.region.filter((r) => r !== region)
        : [...state.region.filter((r) => r !== 'all'), region];

      console.log('🛠 [toggleRegion]:', newRegions);
      return { region: newRegions.length > 0 ? newRegions : ['all'] };
    }),

  // ✅ 개설 확정 여부 토글 (true ↔ null)
  toggleConfirmed: () =>
    set((state) => {
      const newConfirmed = state.isConfirmed === null ? true : null;
      console.log('🛠 [toggleConfirmed] 상태 변경:', newConfirmed);
      return { isConfirmed: newConfirmed };
    }),

  // ✅ 필터 초기화
  resetFilters: () => {
    console.log('🛠 [resetFilters] 필터 초기화됨');
    set({
      moimType: 'all',
      region: ['all'],
      status: 'all',
      sortOrder: 'LATEST',
      isConfirmed: null, // ✅ 초기화할 때 모든 데이터 표시
    });
  },
}));
