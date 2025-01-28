import { TMoimClient, TMoims, TMoimsJoined } from '@/types/supabase/supabase-custom.type';
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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const formData = await req.formData();
  const moimDataString = formData.get('moim_json');
  const moimImageFile = formData.get('moim_image') as File;
  const moimDataOrigin = JSON.parse(moimDataString as string);

  const { data: existingMoim, error: existingMoimError } = await supabase
    .from('moims')
    .select('*')
    .eq('id', id)
    .single();

  if (existingMoimError) {
    return NextResponse.json({ message: existingMoimError?.message }, { status: 401 });
  }

  const moimData: Partial<TMoims> = {
    title: moimDataOrigin.title,
    content: moimDataOrigin.content,
    address: moimDataOrigin.roadAddress,
    recruitment_deadline: moimDataOrigin.recruitmentDeadline,
    start_date: moimDataOrigin.startDate,
    end_date: moimDataOrigin.endDate,
    min_participants: moimDataOrigin.minParticipants,
    max_participants: moimDataOrigin.maxParticipants,
    category: moimDataOrigin.moimType,
    status: moimDataOrigin.status,
    master_email: existingMoim?.master_email,
    images: [],
  };

  const {
    data: updatedMoim,
    error: updatedMoimError,
  }: { data: TMoimsJoined | null; error: PostgrestError | null } = await supabase
    .from('moims')
    .upsert(moimData)
    .select('*, reviews (*), participated_moims (*)')
    .single();

  if (updatedMoimError) {
    return NextResponse.json({ message: updatedMoimError?.message }, { status: 401 });
  }

  if (!updatedMoim) {
    return NextResponse.json({ message: '모임 수정 실패' }, { status: 404 });
  }

  const moimsToClient: TMoimClient[] = mapMoimsToClient([updatedMoim]);

  return NextResponse.json(moimsToClient[0], { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: moim, error: moimError } = await supabase
    .from('moims')
    .delete()
    .eq('id', id)
    .select();

  if (moimError) {
    return NextResponse.json({ message: moimError?.message }, { status: 401 });
  }

  return NextResponse.json({ message: '모임 삭제 성공' }, { status: 200 });
}
