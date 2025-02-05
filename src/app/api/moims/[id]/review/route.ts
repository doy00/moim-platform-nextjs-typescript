import { TReviewInput, TReviews } from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// 해당 모임의 모든 리뷰 조회
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: reviews,
    error: reviewsError,
  }: { data: TReviews[] | null; error: PostgrestError | null } = await supabase
    .from('reviews')
    .select('*')
    .eq('moim_uuid', id)
    .order('created_at', { ascending: false });

  if (reviewsError) {
    return NextResponse.json({ message: reviewsError?.message }, { status: 401 });
  }

  if (!reviews) {
    return NextResponse.json({ message: '리뷰가 없어요' }, { status: 401 });
  }

  const mappedReviews = reviews?.map((review) => ({
    userUuid: review.user_uuid,
    review: review.review,
    rate: review.rate,
    userEmail: review.user_email,
    userImage: review.user_image,
    userNickname: review.user_nickname,
  }));

  return NextResponse.json(mappedReviews, { status: 200 });
}

// 리뷰 작성
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
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
    return NextResponse.json({ message: '로그인 후 이용해주세요' }, { status: 401 });
  }

  const {
    data: postedReview,
    error: postedReviewError,
  }: { data: TReviews | null; error: PostgrestError | null } = await supabase
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

  if (!postedReview) {
    return NextResponse.json({ message: '리뷰 작성에 실패했습니다' }, { status: 401 });
  }

  const { data: moim, error: moimError } = await supabase
    .from('moims')
    .select(
      '*, reviews (user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .eq('id', id)
    .single();

  if (moimError) {
    return NextResponse.json({ message: moimError?.message }, { status: 401 });
  }

  if (!moim) {
    return NextResponse.json({ message: '모임 정보가 없어요' }, { status: 401 });
  }

  const response = {
    message: '리뷰 작성이 성공적으로 완료되었습니다',
    data: mapMoimsToClient([moim])[0],
  };

  return NextResponse.json(response, { status: 200 });
}
