import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { AuthError, User } from '@supabase/supabase-js';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
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

  const { data: deletedParticipated, error: deletedParticipatedError } = await supabase
    .from('participated_moims')
    .delete()
    .eq('moim_uuid', id)
    .eq('user_uuid', foundUser.id)
    .select()
    .single();

  if (deletedParticipatedError) {
    return NextResponse.json({ message: deletedParticipatedError?.message }, { status: 500 });
  }

  if (!deletedParticipated) {
    return NextResponse.json({ message: '참여하지 않은 모임이에요' }, { status: 404 });
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
    message: '모임 참여 취소가 성공적으로 완료되었습니다',
    data: mapMoimsToClient([moim])[0],
  };

  return NextResponse.json(response, { status: 200 });
}
