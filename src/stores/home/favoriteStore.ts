import { create } from 'zustand'
import axiosInstance from '@/libs/home/home-axios'

type TFavoriteState = {
  favorites: Set<number> // 찜한 모임 ID 저장
  toggleFavorite: (id: number) => void; // 찜 상태 토글
  fetchFavorites: () => Promise<void>; // 초기 로드 시 찜 데이터 가져오기
}

export const useFavoriteStore = create<TFavoriteState>((set, get) => ({
  favorites: new Set(),
  toggleFavorite: async(id: number) => {
    const favorites = new Set(get().favorites);

    if(favorites.has(id)) {
      favorites.delete(id)
      try {
        await axiosInstance.delete(`/favorites/${id}`)
    } catch (error) {
        console.error('Failed to remove favorite', error)
    }
  } else {
    favorites.add(id);
    try {
      await axiosInstance.post(`/favorites`, { id })
    } catch(error) {
      console.error('Failed to add favorite', error)
    }
  }
  
    set({ favorites })

  },
  fetchFavorites: async () => {
    try {
      const response = await axiosInstance.get<{ id: number }[]>('/favorites');
      const favorites = new Set<number>(response.data.map((item) => item.id)); // 타입 명시
      set({ favorites });
    } catch (error) {
      console.error('Failed to fetch favorites', error);
    }
  },
}))