import { TReview } from '@/types/supabase/supabase-custom.type';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// 해당 모임의 모든 리뷰 조회
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')
    .eq('moim_uuid', id)
    .order('created_at', { ascending: false });

  if (reviewsError) {
    return NextResponse.json({ message: reviewsError?.message }, { status: 401 });
  }

  return NextResponse.json({ data: reviews }, { status: 200 });
}

// 리뷰 작성
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { review, rate }: TReview = await req.json();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ message: error?.message }, { status: 401 });
  }

  if (!user) {
    return NextResponse.json({ message: '로그인 후 이용해주세요' }, { status: 401 });
  }

  const {
    data: postedReview,
    error: postedReviewError,
  }: { data: TReview | null; error: PostgrestError | null } = await supabase
    .from('reviews')
    .upsert({
      moim_uuid: id,
      user_uuid: user.id,
      review,
      rate,
    })
    .select()
    .single();

  if (postedReviewError) {
    return NextResponse.json({ message: postedReviewError?.message }, { status: 401 });
  }

  return NextResponse.json(postedReview, { status: 200 });
}
