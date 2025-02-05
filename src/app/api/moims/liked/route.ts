import { MOIMS_ITEMS_PER_PAGE } from '@/constants/common/common.const';
import {
  TLikedMoimsJoined,
  TMoimClient,
  TMoimsJoined,
} from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 내가 좋아요한 모임 조회
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageQuery = searchParams.get('page');
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
    return NextResponse.json({ message: '로그인 후 이용해주세요' }, { status: 401 });
  }

  const { data: foundUser, error: foundUserError } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (foundUserError) {
    return NextResponse.json({ message: foundUserError?.message }, { status: 401 });
  }

  if (!foundUser) {
    return NextResponse.json({ message: '사용자 정보가 없어요' }, { status: 401 });
  }

  const {
    data: moims,
    error: moimsError,
  }: { data: TLikedMoimsJoined[] | null; error: PostgrestError | null } = await supabase
    .from('liked_moims')
    .select(
      '*, moims (*, reviews (user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid))',
    )
    .eq('user_uuid', foundUser.id)
    .order('created_at', { ascending: false });

  if (moimsError) {
    // console.error(moimsError);
    return NextResponse.json({ message: moimsError?.message }, { status: 401 });
  }

  if (!moims) {
    return NextResponse.json({ message: '좋아요한 모임이 없어요' }, { status: 404 });
  }

  const mappedMoims: TMoimsJoined[] = moims.map((moim) => ({
    ...moim.moims,
    reviews: moim.moims.reviews,
    participated_moims: moim.moims.participated_moims,
    liked_moims: moim.moims.liked_moims,
  }));

  const moimsToClient: TMoimClient[] = mapMoimsToClient(mappedMoims);
  const totalItems = moims.length;
  const totalPages = Math.ceil(moims.length / MOIMS_ITEMS_PER_PAGE);

  if (pageQuery !== 'null') {
    const page = Number(pageQuery);
    const start = page === 1 || page === 0 ? 0 : (page - 1) * MOIMS_ITEMS_PER_PAGE;
    const end = start + MOIMS_ITEMS_PER_PAGE - 1;
    const slicedMoimsToClient = moimsToClient.slice(start, end);

    return NextResponse.json(
      {
        data: slicedMoimsToClient,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page, // 1부터 시작하는 페이지 번호
        },
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      data: moimsToClient,
      pagination: {
        totalItems,
        totalPages,
        currentPage: 1, // 페이지 파라미터가 없으므로 첫 번째 페이지로 간주
      },
    },
    { status: 200 },
  );
}
