import { IMoim } from '@/types/home/i-moim';
import { create } from 'zustand';

type TMoimState = {
  moims: IMoim[];
  fetchMoims: () => Promise<void>;
};

export const useMoimStore = create<TMoimState>((set) => ({
  moims: [],
  fetchMoims: async () => {
    try {
    } catch (error) {
      console.error('Failed to fetch moims', error);
    }
  },
}));
