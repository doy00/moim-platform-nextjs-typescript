import { create } from 'zustand';
import axiosInstance from '@/libs/home/home-axios';
import { LikeState } from '@/types/home/t-likeState';

export const useLikeStore = create<LikeState>((set, get) => ({
  likes: new Set(),

  toggleLike: async (moimId: number) => {
    const likes = new Set(get().likes);
    const isLiked = likes.has(moimId);

    // 낙관적 업데이트
    if (isLiked) {
      likes.delete(moimId); // 찜 해제
    } else {
      likes.add(moimId); // 찜 추가
    }
    set({ likes });

    try {
      if (isLiked) {
        await axiosInstance.delete(`/moim/like/${moimId}`);
      } else {
        await axiosInstance.post(`/moim/like`, { moimId });
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);

      // 실패 시 롤백
      if (isLiked) {
        likes.add(moimId);
      } else {
        likes.delete(moimId);
      }
      set({ likes });
    }
  },

  fetchLikes: async () => {
    try {
      const response = await axiosInstance.get<{ moimId: number }[]>('/moim/likes');
      const likes = new Set(response.data.map((item) => item.moimId));
      set({ likes });
    } catch (error) {
      console.error('Failed to fetch likes:', error);
    }
  },
}));
