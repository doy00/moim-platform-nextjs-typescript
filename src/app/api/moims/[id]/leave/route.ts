import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
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

  const { data: deletedParticipated, error: deletedParticipatedError } = await supabase
    .from('participated_moims')
    .delete()
    .eq('moim_uuid', id)
    .eq('user_uuid', foundUser.id)
    .select()
    .single();

  if (deletedParticipatedError) {
    return NextResponse.json({ message: deletedParticipatedError?.message }, { status: 401 });
  }

  if (!deletedParticipated) {
    return NextResponse.json({ message: '참여하지 않은 모임이에요' }, { status: 401 });
  }

  const { data: participated, error: participatedSelectError } = await supabase
    .from('participated_moims')
    .select('*')
    .eq('moim_uuid', id);

  if (participatedSelectError) {
    return NextResponse.json({ message: participatedSelectError?.message }, { status: 401 });
  }

  const response = {
    message: '모임 참여 취소가 성공적으로 완료되었습니다',
    data: {
      moimId: id,
      participated: participated?.length,
    },
  };

  return NextResponse.json(response, { status: 200 });
}
