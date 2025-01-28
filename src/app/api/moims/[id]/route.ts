import { TMoimClient, TMoimsJoined } from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: moim,
    error: moimError,
  }: { data: TMoimsJoined | null; error: PostgrestError | null } = await supabase
    .from('moims')
    .select('*, reviews (*), participated_moims (*)')
    .eq('id', id)
    .single();

  if (moimError) {
    return NextResponse.json({ message: moimError?.message }, { status: 401 });
  }

  if (!moim) {
    return NextResponse.json({ message: '존재하지 않는 모임입니다' }, { status: 401 });
  }

  const moimToClient: TMoimClient[] = mapMoimsToClient([moim]);

  return NextResponse.json(moimToClient[0], { status: 200 });
}
