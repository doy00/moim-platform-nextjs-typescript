import { create } from 'zustand';
import axiosHomeInstance from '@/libs/home/home-axios';

interface LikeState {
  likes: Set<string>;
  likeDeltas: Record<string, number>;
  toggleLike: (moimId: string) => Promise<void>;
  fetchLikes: () => Promise<void>;
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likes: new Set(),
  likeDeltas: {},

  toggleLike: async (moimId: string) => {
    const currentLikes = new Set(get().likes);
    const currentDeltas = { ...get().likeDeltas };
    const isLiked = currentLikes.has(moimId);

    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.warn('비로그인 상태에서는 좋아요를 변경할 수 없습니다.');
        return;
      }
    }

    try {
      if (isLiked) {
        await axiosHomeInstance.delete(`/moims/${moimId}/like`);
      } else {
        await axiosHomeInstance.post(`/moims/${moimId}/like`);
      }

      if (isLiked) {
        currentLikes.delete(moimId);
        currentDeltas[moimId] = (currentDeltas[moimId] || 0) - 1;
      } else {
        currentLikes.add(moimId);
        currentDeltas[moimId] = (currentDeltas[moimId] || 0) + 1;
      }
      set({ likes: currentLikes, likeDeltas: currentDeltas });
    } catch (error: any) {
      console.error('Failed to toggle like:', error);
    }
  },

  fetchLikes: async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.warn('비로그인 상태에서는 좋아요 목록을 가져올 수 없습니다.');
        return;
      }
    }

    try {
      const response = await axiosHomeInstance.get('/moims/liked');
      const likedMoims = response.data.data;
      const likedIds = likedMoims.map((moim: any) => moim.moimId);
      set({ likes: new Set(likedIds), likeDeltas: {} });
    } catch (error) {
      console.error('Failed to fetch likes:', error);
    }
  },
}));
