import { TMe } from '@/types/auth/auth.type';
import { setCookie } from '@/utils/auth/auth-server.util';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password }: { email: string; password: string } = await request.json();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: existingUser, error: existingUserError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!existingUser) {
    return NextResponse.json({ message: '등록되지 않은 계정이에요' }, { status: 400 });
  }

  if (existingUserError) {
    return NextResponse.json({ message: '서버에 문제가 발생했습니다' }, { status: 500 });
  }

  const {
    data: { user, session },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message === 'Invalid login credentials') {
      return NextResponse.json({ message: '비밀번호를 확인해주세요' }, { status: 400 });
    }
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  if (!user) {
    return NextResponse.json({ message: '로그인에 실패했습니다' }, { status: 404 });
  }

  const { data: me, error: userError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase.from('users').select('*').eq('email', user.email).single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 401 });
  }
  if (!me) {
    return NextResponse.json({ message: '로그인에 실패했습니다' }, { status: 404 });
  }

  setCookie({
    name: 'access_token',
    value: session?.access_token,
    maxAge: 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  setCookie({
    name: 'refresh_token',
    value: session?.refresh_token,
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return NextResponse.json(
    { me, tokens: { accessToken: session?.access_token, refreshToken: session?.refresh_token } },
    { status: 200 },
  );
}
