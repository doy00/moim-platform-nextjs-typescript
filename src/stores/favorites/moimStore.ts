import { create } from 'zustand';
import { IMoim, fetchMockMoims } from '@/utils/home/fetchMoims';

type TMoimState = {
  moims: IMoim[];
  fetchMoims: () => Promise<void>;
};

export const useMoimStore = create<TMoimState>((set) => ({
  moims: [],
  fetchMoims: async () => {
    try {
      const response = await fetchMockMoims({ page: 1 });
      set({ moims: response.data });
    } catch (error) {
      console.error('Failed to fetch moims', error);
    }
  },
}));
