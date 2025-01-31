import { TMoimClient, TMoims, TMoimsJoined } from '@/types/supabase/supabase-custom.type';
import convertToWebP from '@/utils/common/converToWebp';
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

  // 현재 시간 가져오기 (UTC)
  const now = new Date().toISOString();

  // 상태 결정 로직
  let status: 'RECRUIT' | 'PROGRESS' | 'END';
  if (now < moimDataOrigin.recruitmentDeadline) {
    status = 'RECRUIT';
  } else if (now >= moimDataOrigin.startDate && now <= moimDataOrigin.endDate) {
    status = 'PROGRESS';
  } else {
    status = 'END';
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
    status,
    master_email: existingMoim?.master_email,
    images: existingMoim?.images,
    updated_at: new Date().toISOString(),
  };

  if (moimImageFile) {
    const imageBuffer = await convertToWebP(moimImageFile, 1080);
    const filePath = `moims_${Date.now()}.webp`;

    if (!imageBuffer) {
      return NextResponse.json({ message: '이미지 변환 중 오류 발생' }, { status: 500 });
    }

    const { data: imageData, error: imageError } = await supabase.storage
      .from('moims')
      .upload(filePath, imageBuffer, {
        contentType: 'image/webp',
      });

    if (imageError) {
      return NextResponse.json({ message: '이미지 업로드 중 오류 발생' }, { status: 500 });
    }

    const { data: imageUrlData } = supabase.storage.from('moims').getPublicUrl(filePath);
    moimData.images = [imageUrlData.publicUrl];
  }

  const {
    data: updatedMoim,
    error: updatedMoimError,
  }: { data: TMoimsJoined | null; error: PostgrestError | null } = await supabase
    .from('moims')
    .upsert({ ...moimData })
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
