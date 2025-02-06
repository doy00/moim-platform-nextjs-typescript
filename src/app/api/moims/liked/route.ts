import { MOIMS_ITEMS_PER_PAGE } from '@/constants/common/common.const';
import {
  TLikedMoimsJoined,
  TMoimClient,
  TMoimsJoined,
} from '@/types/supabase/supabase-custom.type';
import { setCookie } from '@/utils/auth/auth-server.util';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { AuthError, PostgrestError, User } from '@supabase/supabase-js';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 내가 좋아요한 모임 조회
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageQuery = searchParams.get('page');
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const authorization = (await headers()).get('authorization');
  const token = authorization?.split(' ')[1] ?? null;
  const refreshToken = cookieStore.get('refresh_token')?.value ?? null;

  console.log('refreshToken????? ====>', refreshToken);

  let user: User | null;
  let error: AuthError | null;

  if (!token) {
    ({
      data: { user },
      error,
    } = await supabase.auth.getUser());
  } else {
    ({
      data: { user },
      error,
    } = await supabase.auth.getUser(token));
  }

  console.log('error????? ====>', error?.code);

  // TODO: refreshToken 이 자꾸 invalid 라는데,
  // 실제로 로그인 후 한시간 기다려서 access_token 이 만료된 뒤에,
  // 진짜 refresh_token이 invalid 한것인지, 즉 내가 로직을 잘못 짠 것인지 뭔지 테스트 필요
  // 그리고 getUser 로직이 route handler 마다 반복되므로, api/auth/me 로 한번 get을 날려서 처리하는 방법은 없는지 확인 필요
  if (error?.code === 'bad_jwt' && refreshToken) {
    console.log('why refreshToken????? ====>', refreshToken);
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    console.log('refreshError????????? ====>', refreshError);

    if (refreshData?.session?.access_token && refreshData?.session?.refresh_token) {
      const { data: userData, error: userError } = await supabase.auth.getUser(
        refreshData.session.access_token,
      );
      user = userData.user;

      setCookie({
        name: 'access_token',
        value: refreshData?.session?.access_token,
        maxAge: 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      setCookie({
        name: 'refresh_token',
        value: refreshData?.session?.refresh_token,
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }
  }

  if (error) {
    // console.log('error????? ====>', error);
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
}
