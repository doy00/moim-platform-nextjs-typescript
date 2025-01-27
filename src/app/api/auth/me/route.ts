import { TMe } from '@/types/auth/auth.type';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // if (error.message === 'Auth session missing!')
    //   return NextResponse.json('Auth session missing!', { status: 200 });
    console.log('getUser error from route handler ====>', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: '인증되지 않은 사용자입니다' }, { status: 401 });
    }
    return NextResponse.json({ message: error?.message }, { status: 401 });
  }
  if (!user) {
    return NextResponse.json({ message: '로그인된 사용자가 없습니다' }, { status: 404 });
  }

  const { data: userData, error: userError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase.from('users').select('*').eq('email', user.email).single();

  if (userError) {
    return NextResponse.json({ message: userError?.message }, { status: 401 });
  }

  if (!userData) {
    return NextResponse.json({ message: '사용자 정보를 찾을 수 없습니다' }, { status: 404 });
  }

  return NextResponse.json(userData, { status: 200 });
}
