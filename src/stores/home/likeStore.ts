import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

interface LikeState {
  likes: Set<string>;
  toggleLike: (moimId: string) => Promise<void>;
  fetchLikes: () => Promise<void>;
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likes: new Set(),

  toggleLike: async (moimId: string) => {
    const currentLikes = new Set(get().likes);
    const isLiked = currentLikes.has(moimId);
    const user = (await supabase.auth.getUser()).data.user;

    if (!user) return;

    try {
      if (isLiked) {
        await supabase
          .from('liked_moims')
          .delete()
          .eq('moim_uuid', moimId)
          .eq('user_uuid', user.id);
        currentLikes.delete(moimId);
      } else {
        await supabase
          .from('liked_moims')
          .insert({ moim_uuid: moimId, user_uuid: user.id });
        currentLikes.add(moimId);
      }

      set({ likes: new Set(currentLikes) });
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  },

  fetchLikes: async () => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('liked_moims')
        .select('moim_uuid')
        .eq('user_uuid', user.id);

      if (error) throw error;

      const likes = new Set(data.map((item) => item.moim_uuid));
      set({ likes });
    } catch (error) {
      console.error('Failed to fetch likes:', error);
    }
  },
}));
