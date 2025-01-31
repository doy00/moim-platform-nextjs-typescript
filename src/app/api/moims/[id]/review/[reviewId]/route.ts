import { TReviewInput, TReviews } from '@/types/supabase/supabase-custom.type';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; reviewId: string }> },
) {
  const id = (await params).id;
  const reviewId = (await params).reviewId;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { review, rate }: TReviewInput = await req.json();

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
    data: updatedReview,
    error: updatedReviewError,
  }: { data: TReviews | null; error: PostgrestError | null } = await supabase
    .from('reviews')
    .update({ review, rate })
    .eq('id', reviewId)
    .eq('user_uuid', user.id)
    .eq('moim_uuid', id)
    .select()
    .single();

  if (updatedReviewError) {
    return NextResponse.json({ message: updatedReviewError?.message }, { status: 401 });
  }

  return NextResponse.json(updatedReview, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; reviewId: string }> },
) {
  const id = (await params).id;
  const reviewId = (await params).reviewId;
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

  const { data: deletedReview, error: deletedReviewError } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
    .eq('moim_uuid', id)
    .eq('user_uuid', user.id)
    .select()
    .single();

  if (deletedReviewError) {
    return NextResponse.json({ message: deletedReviewError?.message }, { status: 401 });
  }

  return NextResponse.json({ data: deletedReview, message: '리뷰 삭제 완료' }, { status: 200 });
}
