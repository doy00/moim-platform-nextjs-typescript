import { TMe } from '@/types/auth/auth.type';
import { TReviewWithMoim, TReviewWithMoimClient } from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { AuthError, PostgrestError, User } from '@supabase/supabase-js';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

// 내가 작성한 모든 리뷰 조회
export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const authorization = (await headers()).get('authorization');
  const token = authorization?.split(' ')[1] ?? null;

  let user: User | null;
  let error: AuthError | null;
  if (token) {
    ({
      data: { user },
      error,
    } = await supabase.auth.getUser(token));
  } else {
    ({
      data: { user },
      error,
    } = await supabase.auth.getUser());
  }

  if (error) {
    return NextResponse.json({ message: error?.message }, { status: 401 });
  }

  if (!user) {
    return NextResponse.json({ message: '유저가 없습니다' }, { status: 404 });
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
    data: reviewsWithMoim,
    error: reviewsError,
  }: { data: TReviewWithMoim[] | null; error: PostgrestError | null } = await supabase
    .from('reviews')
    .select(
      '*, moims (*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid))',
    )
    .eq('user_uuid', foundUser.id)
    .order('created_at', { ascending: false });

  if (reviewsError) {
    return NextResponse.json({ message: reviewsError?.message }, { status: 500 });
  }

  if (!reviewsWithMoim) {
    return NextResponse.json({ message: '리뷰가 없어요' }, { status: 404 });
  }

  const mappedReviewsWithMoim: TReviewWithMoimClient[] = reviewsWithMoim.map((review) => ({
    userUuid: review.user_uuid,
    review: review.review,
    rate: review.rate,
    userEmail: review.user_email,
    userImage: review.user_image,
    userNickname: review.user_nickname,
    createdAt: review.created_at,
    moims: mapMoimsToClient([review.moims])[0],
  }));

  return NextResponse.json(mappedReviewsWithMoim, { status: 200 });
}
