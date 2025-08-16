// import { createClient } from '@supabase/supabase-js';
// import { Database } from '@/types/supabase/supabase';
import { mockMoims } from '@/data/mockData';

// const supabase = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// );

const ITEMS_PER_PAGE = 10;

export const fetchMoims = async ({ pageParam = 1 }: { pageParam: number }) => {
  try {
    // 목업 데이터 사용
    const startIndex = (pageParam - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const data = mockMoims.slice(startIndex, endIndex);
    const count = mockMoims.length;

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

  /* 기존 Supabase 코드 (주석처리)
  try {
    const { data, error, count } = await supabase
      .from('moims')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((pageParam - 1) * ITEMS_PER_PAGE, pageParam * ITEMS_PER_PAGE - 1);

    if (error) throw error;

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
  */
};
