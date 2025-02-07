// src/stores/home/filterStore.ts
import { create } from 'zustand';
import { TFilterState } from '@/types/home/t-filterState';

export const useFilterStore = create<TFilterState>((set) => ({
  moimType: 'all',
  onoff: 'all',
  status: 'all',
  sortOrder: 'LATEST',
  isConfirmed: null,

  setSortOrder: (sortOrder: 'LATEST' | 'LIKES' | 'DEADLINE') => {
    console.log('🛠 [setSortOrder]:', sortOrder);
    set({ sortOrder });
  },

  setMoimType: (moimType: string) => {
    console.log('🛠 [setMoimType]:', moimType);
    set({ moimType });
  },

  setStatus: (status: string) => {
    console.log('🛠 [setStatus]:', status);
    set({ status });
  },

  setOnOff: (onoff: 'online' | 'offline' | 'all') => {
    console.log(`🛠 [setOnOffFilter]: ${onoff}`);
    set({ onoff });
  },

  toggleConfirmed: () =>
    set((state) => {
      const newConfirmed = state.isConfirmed === null ? true : null;
      console.log('🛠 [toggleConfirmed] 상태 변경:', newConfirmed);
      return { isConfirmed: newConfirmed };
    }),

  resetFilters: () => {
    console.log('🛠 [resetFilters] 필터 초기화됨');
    set({
      moimType: 'all',
      onoff: 'all',
      status: 'all',
      sortOrder: 'LATEST',
      isConfirmed: null,
    });
  },
}));
