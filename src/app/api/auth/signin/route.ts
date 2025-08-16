// import { TMe } from '@/types/auth/auth.type';
// import { setCookie } from '@/utils/auth/auth-server.util';
// import { createClient } from '@/utils/supabase/server';
// import { PostgrestError } from '@supabase/supabase-js';
// import { cookies } from 'next/headers';
import { mockAuth } from '@/utils/mockAuth';
import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: Request) {
  // 목업 인증 사용
  try {
    const { email, password }: { email: string; password: string } = await request.json();
    const result = await mockAuth.signIn(email, password);
    
    return NextResponse.json(
      { me: result.me, tokens: result.tokens },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ message: '로그인 실패' }, { status: 401 });
  }

  /* 기존 Supabase 코드 (주석처리)
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
      return NextResponse.json({ message: '비밀번호를 확인해주세요' }, { status: 401 });
    }
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
  if (!user) {
    return NextResponse.json({ message: '로그인에 실패했습니다' }, { status: 500 });
  }

  const { data: me, error: userError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase
      .from('users')
      .select('id, email, nickname, position, introduction, tags, image, is_social')
      .eq('email', user.email)
      .single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 500 });
  }
  if (!me) {
    return NextResponse.json({ message: '로그인에 실패했습니다' }, { status: 500 });
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
    { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // 🔥 CORS 허용
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
  */
}
