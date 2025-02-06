import { TMe } from '@/types/auth/auth.type';
import { TMoimClient, TMoimsJoined } from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { AuthError, PostgrestError, User } from '@supabase/supabase-js';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

// 내가 만든 모임 조회
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

  const { data: me, error: meError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase.from('users').select('*').eq('email', user.email).single();

  if (meError) {
    return NextResponse.json({ message: meError?.message }, { status: 401 });
  }

  if (!me) {
    return NextResponse.json({ message: '유저가 없습니다' }, { status: 404 });
  }

  const {
    data: myMoims,
    error: myMoimsError,
  }: { data: TMoimsJoined[] | null; error: PostgrestError | null } = await supabase
    .from('moims')
    .select(
      '*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .eq('master_email', me.email)
    .order('created_at', { ascending: false });

  if (myMoimsError) {
    return NextResponse.json({ message: myMoimsError?.message }, { status: 500 });
  }

  if (!myMoims) {
    return NextResponse.json({ message: '내가 만든 모임이 없습니다' }, { status: 404 });
  }

  const moimsToClient: TMoimClient[] = mapMoimsToClient(myMoims);

  return NextResponse.json(moimsToClient, { status: 200 });
}
