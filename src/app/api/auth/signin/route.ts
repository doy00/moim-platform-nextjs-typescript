import { TMe } from '@/types/auth/auth.type';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password }: { email: string; password: string } = await request.json();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  if (!user) {
    return NextResponse.json({ message: '로그인에 실패했습니다' }, { status: 404 });
  }

  const { data: me, error: userError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase.from('users').select('*').eq('id', user.id).single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 401 });
  }
  if (!me) {
    return NextResponse.json({ message: '로그인에 실패했습니다' }, { status: 404 });
  }

  return NextResponse.json(me, { status: 200 });
}
