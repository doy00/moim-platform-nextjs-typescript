import { MOIMS_ITEMS_PER_PAGE } from '@/constants/common/common.const';
// import {
//   TLikedMoimsJoined,
//   TMoimClient,
//   TMoimsJoined,
// } from '@/types/supabase/supabase-custom.type';
// import { setCookie } from '@/utils/auth/auth-server.util';
// import { mapMoimsToClient } from '@/utils/common/mapMoims';
// import { createClient } from '@/utils/supabase/server';
// import { PostgrestError } from '@supabase/supabase-js';
// import { cookies } from 'next/headers';
import { mockApi } from '@/apis/mockApi';
import { NextRequest, NextResponse } from 'next/server';
// import { getUser } from '../../auth/getUser';

// 내가 좋아요한 모임 조회
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageQuery = searchParams.get('page');
  
  // 목업 데이터 사용
  try {
    const result = await mockApi.getLikedMoims();
    const page = Math.max(1, Number(pageQuery) || 1);
    const totalPages = Math.ceil(result.totalCount / MOIMS_ITEMS_PER_PAGE);

    return NextResponse.json(
      {
        data: result.data,
        pagination: {
          totalItems: result.totalCount,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: '좋아요한 모임을 불러오는데 실패했습니다' }, { status: 500 });
  }

  /* 기존 Supabase 코드 (주석처리)
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { isSuccess, message, user, status } = await getUser(supabase);

  if (!isSuccess) {
    return NextResponse.json({ message }, { status });
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
    return NextResponse.json({ message: '사용자 정보가 없어요' }, { status: 404 });
  }

  const page = Math.max(1, Number(pageQuery) || 1); // 최소 1 보장
  const start = (page - 1) * MOIMS_ITEMS_PER_PAGE;
  const end = start + MOIMS_ITEMS_PER_PAGE - 1;

  const {
    data: moims,
    error: moimsError,
  }: { data: TLikedMoimsJoined[] | null; error: PostgrestError | null } = await supabase
    .from('liked_moims')
    .select(
      '*, moims (*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid))',
    )
    .eq('user_uuid', foundUser.id)
    .order('created_at', { ascending: false })
    .range(start, end);

  if (moimsError) {
    return NextResponse.json({ message: moimsError?.message }, { status: 500 });
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

  return NextResponse.json(
    {
      data: moimsToClient,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
      },
    },
    { status: 200 },
  );
  */
}
