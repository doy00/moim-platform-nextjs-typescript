import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    // console.log("비번변경시 에러 서버에서 =>", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ message: '로그인에 실패했습니다' }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: '비밀번호 변경에 성공했습니다',
      redirectUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
    },
    { status: 200 },
  );
}
