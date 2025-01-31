import { TReviewWithMoim } from '@/types/supabase/supabase-custom.type';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// 내가 작성한 모든 리뷰 조회
export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ message: error?.message }, { status: 401 });
  }

  if (!user) {
    return NextResponse.json({ message: '유저가 없습니다' }, { status: 401 });
  }

  const {
    data: reviewsWithMoim,
    error: reviewsError,
  }: { data: TReviewWithMoim[] | null; error: PostgrestError | null } = await supabase
    .from('reviews')
    .select('*, moims (*)')
    .eq('user_uuid', user.id)
    .order('created_at', { ascending: false });

  if (reviewsError) {
    return NextResponse.json({ message: reviewsError?.message }, { status: 401 });
  }

  return NextResponse.json(reviewsWithMoim, { status: 200 });
}
