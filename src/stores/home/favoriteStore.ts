import { create } from 'zustand'
import axiosInstance from '@/libs/home/home-axios'

type TFavoriteState = {
  favorites: Set<number> // 찜한 모임 ID 저장
  toggleFavorite: (id: number) => void; // 찜 상태 토글
  fetchFavorites: () => Promise<void>; // 초기 로드 시 찜 데이터 가져오기
}

export const useFavoriteStore = create<TFavoriteState>((set, get) => ({
  favorites: new Set(),

  toggleFavorite: async (moimId: number) => {
    const favorites = new Set(get().favorites);
    const isFavorited = favorites.has(moimId);

    // Optimistic Update
    if (isFavorited) {
      favorites.delete(moimId);
      set({ favorites });
    } else {
      favorites.add(moimId);
      set({ favorites });
    }

    try {
      // API 호출
      const response = await axiosInstance.post(`/moim/like`, null, {
        params: { moimId },
      });

      if (!response.data.isSuccess) {
        throw new Error(response.data.message || 'Failed to toggle favorite');
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);

      // Rollback 상태
      if (isFavorited) {
        favorites.add(moimId);
      } else {
        favorites.delete(moimId);
      }
      set({ favorites });
    }
  },

  fetchFavorites: async () => {
    try {
      const response = await axiosInstance.get<{ moimId: number }[]>('/favorites');
      const favorites = new Set<number>(response.data.map((item) => item.moimId));
      set({ favorites });
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  },
}));
