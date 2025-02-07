import { getUser } from '@/app/api/auth/getUser';
import { TMe } from '@/types/auth/auth.type';
import { TReviewInput, TReviews } from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
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

  const { isSuccess, message, user, status: userStatus } = await getUser(supabase);

  if (!isSuccess) {
    return NextResponse.json({ message }, { status: userStatus });
  }

  const {
    data: foundUser,
    error: foundUserError,
  }: { data: TMe | null; error: PostgrestError | null } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (foundUserError) {
    return NextResponse.json({ message: foundUserError?.message }, { status: 401 });
  }

  if (!foundUser) {
    return NextResponse.json({ message: '사용자 정보가 없어요' }, { status: 404 });
  }

  const {
    data: updatedReview,
    error: updatedReviewError,
  }: { data: TReviews | null; error: PostgrestError | null } = await supabase
    .from('reviews')
    .update({ review, rate, updated_at: new Date().toISOString() })
    .eq('id', reviewId)
    .eq('user_uuid', foundUser.id)
    .eq('moim_uuid', id)
    .select()
    .single();

  if (updatedReviewError) {
    return NextResponse.json({ message: updatedReviewError?.message }, { status: 500 });
  }

  const { data: moim, error: moimError } = await supabase
    .from('moims')
    .select(
      '*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .eq('id', id)
    .single();

  if (moimError) {
    return NextResponse.json({ message: moimError?.message }, { status: 500 });
  }

  if (!moim) {
    return NextResponse.json({ message: '모임 정보가 없어요' }, { status: 404 });
  }

  const response = {
    message: '리뷰 수정이 성공적으로 완료되었습니다',
    data: mapMoimsToClient([moim])[0],
  };

  return NextResponse.json(response, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; reviewId: string }> },
) {
  const id = (await params).id;
  const reviewId = (await params).reviewId;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { isSuccess, message, user, status: userStatus } = await getUser(supabase);

  if (!isSuccess) {
    return NextResponse.json({ message }, { status: userStatus });
  }

  const {
    data: foundUser,
    error: foundUserError,
  }: { data: TMe | null; error: PostgrestError | null } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (foundUserError) {
    return NextResponse.json({ message: foundUserError?.message }, { status: 401 });
  }

  if (!foundUser) {
    return NextResponse.json({ message: '사용자 정보가 없어요' }, { status: 404 });
  }

  const { data: deletedReview, error: deletedReviewError } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
    .eq('moim_uuid', id)
    .eq('user_uuid', foundUser.id)
    .select()
    .single();

  if (deletedReviewError) {
    return NextResponse.json({ message: deletedReviewError?.message }, { status: 500 });
  }

  const { data: moim, error: moimError } = await supabase
    .from('moims')
    .select(
      '*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .eq('id', id)
    .single();

  if (moimError) {
    return NextResponse.json({ message: moimError?.message }, { status: 500 });
  }

  if (!moim) {
    return NextResponse.json({ message: '모임 정보가 없어요' }, { status: 404 });
  }

  const response = {
    message: '리뷰 삭제가 성공적으로 완료되었습니다',
    data: mapMoimsToClient([moim])[0],
  };

  return NextResponse.json(response, { status: 200 });
}
