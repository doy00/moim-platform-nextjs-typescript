import { TAuthSignUpInputs } from '@/types/auth/auth.type';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password, nickname, position, introduction, tags }: TAuthSignUpInputs =
    await request.json();

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  if (!email || !password || !nickname) {
    return NextResponse.json(
      { message: '이메일, 비밀번호, 닉네임은 필수 입력 항목입니다.' },
      { status: 400 },
    );
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
        position,
        introduction,
        tags,
      },
    },
  });

  if (error) {
    return NextResponse.json({ message: error?.message }, { status: 401 });
  }

  if (!user) {
    return NextResponse.json({ message: '회원가입에 실패했습니다' }, { status: 404 });
  }

  return NextResponse.json({ message: '회원가입 성공' }, { status: 200 });
}
