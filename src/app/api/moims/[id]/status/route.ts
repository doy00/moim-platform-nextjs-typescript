import { TMoimClient, TMoimsJoined } from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const { status } = await req.json();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: moim, error: moimError } = await supabase
    .from('moims')
    .select('*')
    .eq('id', id)
    .single();

  if (moimError) {
    return NextResponse.json({ message: moimError?.message }, { status: 500 });
  }

  if (!moim) {
    return NextResponse.json({ message: '존재하지 않는 모임입니다' }, { status: 404 });
  }

  const {
    data: updatedMoim,
    error: updatedMoimError,
  }: { data: TMoimsJoined | null; error: PostgrestError | null } = await supabase
    .from('moims')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(
      '*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .single();

  if (updatedMoimError) {
    return NextResponse.json({ message: updatedMoimError?.message }, { status: 500 });
  }

  if (!updatedMoim) {
    return NextResponse.json({ message: '모임 상태 업데이트 실패' }, { status: 500 });
  }

  const moimToClient: TMoimClient[] = mapMoimsToClient([updatedMoim]);

  return NextResponse.json(moimToClient[0], { status: 200 });
}
