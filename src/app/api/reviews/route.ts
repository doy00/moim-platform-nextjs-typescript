import { MOIMS_ITEMS_PER_PAGE } from '@/constants/common/common.const';
import { TReviewWithMoim, TReviewWithMoimClient } from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageQuery = searchParams.get('page');
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { count: totalItems, error: countError } = await supabase
    .from('reviews')
    .select('id', { count: 'exact', head: true });

  if (countError) {
    console.error(countError);
    return NextResponse.json({ message: countError?.message }, { status: 500 });
  }

  if (!totalItems) {
    return NextResponse.json({ message: '아이템이 하나도 없어요' }, { status: 404 });
  }

  const page = Math.max(1, Number(pageQuery) || 1); // 최소 1 보장
  const start = (page - 1) * MOIMS_ITEMS_PER_PAGE;
  const end = start + MOIMS_ITEMS_PER_PAGE - 1;

  const {
    data: reviewsWithMoim,
    error: reviewError,
  }: {
    data: TReviewWithMoim[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from('reviews')
    .select(
      '*, moims (*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid))',
    )
    .order('created_at', { ascending: false })
    .range(start, end);

  if (reviewError) {
    console.error(reviewError);
    return NextResponse.json({ message: reviewError?.message }, { status: 500 });
  }

  if (!reviewsWithMoim) {
    return NextResponse.json({ message: '리뷰가 하나도 없어요' }, { status: 404 });
  }

  const totalPages = Math.ceil(totalItems / MOIMS_ITEMS_PER_PAGE);

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

  return NextResponse.json(
    {
      data: mappedReviewsWithMoim,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
      },
    },
    { status: 200 },
  );
}
