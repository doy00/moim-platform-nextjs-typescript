// stores/like/myLikeStore.ts
import { create } from 'zustand';
import { likeApi } from '@/apis/detail/detail.api';

interface LikeStore {
  likedMoimIds: Set<string>;
  isLoading: boolean;
  error: Error | null;
  addLike: (moimId: string) => Promise<void>;
  removeLike: (moimId: string) => Promise<void>;
}

export const mylikeStore = create<LikeStore>((set, get) => ({
  likedMoimIds: new Set(),
  isLoading: false,
  error: null,

  addLike: async (moimId: string) => {
    set({ isLoading: true, error: null });
    try {
      await likeApi.like(moimId);
      set((state) => ({
        likedMoimIds: new Set([...state.likedMoimIds, moimId])
      }));
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  removeLike: async (moimId: string) => {
    set({ isLoading: true, error: null });
    try {
      await likeApi.unlike(moimId);
      set((state) => {
        const newLikedMoimIds = new Set(state.likedMoimIds);
        newLikedMoimIds.delete(moimId);
        return { likedMoimIds: newLikedMoimIds };
      });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },
}));