import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase/supabase';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const ITEMS_PER_PAGE = 10;

export const fetchMoims = async ({ pageParam = 1 }: { pageParam: number }) => {
  try {
    const { data, error, count } = await supabase
      .from('moims')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((pageParam - 1) * ITEMS_PER_PAGE, pageParam * ITEMS_PER_PAGE - 1);

    if (error) throw error;

    console.log('📌 [API Response] fetchMoims data:', data);

    return {
      data: data.map((moim) => ({
        moimId: moim.id,
        title: moim.title,
        content: moim.content,
        createdAt: moim.created_at,
        address: moim.address,
        isConfirmed: moim.is_confirmed ?? false,
        recruitmentDeadline: moim.recruitment_deadline,
        startDate: moim.start_date,
        endDate: moim.end_date,
        minParticipants: moim.min_participants,
        maxParticipants: moim.max_participants,
        moimType: moim.category,
        status: moim.status,
        likes: moim.liked_counts,
        participants: moim.participants_counts,
        reviewsCount: moim.reviews_counts,
      })),
      pagination: {
        current_page: pageParam,
        total_pages: count ? Math.ceil(count / ITEMS_PER_PAGE) : 1,
      },
    };
  } catch (error) {
    console.error('🚨 [Error] fetchMoims:', error);
    throw error;
  }
};
