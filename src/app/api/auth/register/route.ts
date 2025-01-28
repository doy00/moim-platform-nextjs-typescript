import { TAuthSignUpInputs, TMe } from '@/types/auth/auth.type';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password, nickname, position, introduction, tags }: TAuthSignUpInputs =
    await request.json();

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  if (!email || !password || !nickname) {
    return NextResponse.json(
      { message: '이메일, 비밀번호, 닉네임은 필수 입력 항목입니다' },
      { status: 400 },
    );
  }

  const { data: existingUsers, error: existingUsersError } = await supabase
    .from('users')
    .select('*');

  if (existingUsersError) {
    return NextResponse.json({ message: '서버에 문제가 발생했습니다' }, { status: 500 });
  }

  const existingUserNickname = existingUsers.find((user) => user.nickname === nickname);

  if (existingUserNickname) {
    return NextResponse.json({ message: '중복되는 닉네임이 있어요' }, { status: 400 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });

  if (error) {
    console.log('error ====>', error);
    if (error.message === 'User already registered') {
      return NextResponse.json({ message: '이미 가입된 계정이에요' }, { status: 400 });
    }
    return NextResponse.json({ message: error?.message }, { status: 401 });
  }

  if (!user) {
    return NextResponse.json({ message: '회원가입에 실패했습니다' }, { status: 404 });
  }

  const { data: existingUser, error: existingUserError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return NextResponse.json({ message: '이미 가입된 이메일입니다' }, { status: 400 });
  }

  if (existingUserError) {
    return NextResponse.json({ message: '서버에 문제가 발생했습니다' }, { status: 500 });
  }

  const { data: userData, error: userError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase
      .from('users')
      .upsert({
        email,
        nickname,
        position,
        introduction,
        tags,
      })
      .select()
      .single();

  if (userError) {
    // console.log('userError ====>', userError);
    return NextResponse.json({ message: '회원가입에 실패했습니다' }, { status: 404 });
  }

  if (!userData) {
    return NextResponse.json({ message: '회원가입에 실패했습니다' }, { status: 404 });
  }

  // console.log('userData ====>', userData);

  return NextResponse.json({ message: '회원가입 성공' }, { status: 200 });
}
