import { axiosInstance } from '@/apis/detail/axios.api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TFavoriteState = {
  favorites: Set<string>; // 찜한 모임 ID 저장
  isLoading: boolean;
  error: string | null;

  toggleFavorite: (moimId: string) => Promise<void>; // 찜 상태 토글
  fetchFavorites: () => Promise<void>; // 초기 로드 시 찜 데이터 가져오기
  isFavorite: (moimId: string) => boolean;
};

export const useFavoriteStore = create<TFavoriteState>()(
  persist(
    (set, get) => ({
      favorites: new Set(),
      isLoading: false,
      error: null,

      toggleFavorite: async (moimId: string) => {
        const favorites = new Set(get().favorites);
        const isFavorited = get().favorites.has(moimId);
        try {
          set({ isLoading: true, error: null });

          if (isFavorited) {
            await axiosInstance.delete(`/moim/like`, {
              params: { moimId },
              withCredentials: true,
            });
            set((state) => {
              const newFavorites = new Set(state.favorites);
              newFavorites.delete(moimId);
              return { favorites: newFavorites };
            });
            // toast.success('찜하기가 취소되었어요');
          } else {
            await axiosInstance.post(`/moim/like`, null, {
              params: { moimId },
              withCredentials: true,
            });
            set((state) => ({
              favorites: new Set(state.favorites).add(moimId),
            }));
            //toast.success('찜하기가 완료되었어요');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || '찜하기 처리 실패';
          set({ error: errorMessage });
          // toast.error(errorMessage);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      isFavorite: (moimId: string) => {
        return get().favorites.has(moimId);
      },

      fetchFavorites: async () => {
        try {
          set({ isLoading: true, error: null });
          // const response = await axiosInstance.get<IApiResponse<Array<{ moimId: string }>>>(
          // 빌드에러로 임시 주석처리하고 any 처리했습니다
          const response = await axiosInstance.get<any>('/moim/likes', {
            withCredentials: false,
          });
          const favorites = new Set<string>(response.data?.data.map((item: any) => item.moimId)); // 타입 명시
          set({ favorites });
        } catch (error) {
          console.error('Failed to fetch favorites', error);
        }
      },
    }),

    {
      name: 'favorite-storage',
      partialize: (state) => ({
        favorites: Array.from(state.favorites),
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        favorites: new Set(persistedState.favoriteIds || []),
      }),
    },
  ),
);
