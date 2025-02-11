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
    .select(
      '*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .eq('id', id)
    .single();

  if (moimError) {
    return NextResponse.json({ message: moimError?.message }, { status: 500 });
  }

  if (!moim) {
    return NextResponse.json({ message: '존재하지 않는 모임입니다' }, { status: 404 });
  }

  const { data: masterUser, error: masterUserError } = await supabase
    .from('users')
    .select('*')
    .eq('email', moim.master_email)
    .single();

  if (masterUserError) {
    return NextResponse.json({ message: masterUserError?.message }, { status: 500 });
  }

  if (!masterUser) {
    return NextResponse.json(
      { message: '모임 주최자 정보를 찾는데 실패했습니다' },
      { status: 500 },
    );
  }

  const moimToClient: TMoimClient[] = mapMoimsToClient([moim]);

  return NextResponse.json(
    {
      moim: moimToClient[0],
      masterUser: masterUser,
    },
    { status: 200 },
  );
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const formData = await req.formData();
  const moimDataString = formData.get('moim_json');

  if (!moimDataString) {
    return NextResponse.json({ message: 'formData에 moim_json이 없습니다' }, { status: 400 });
  }

  const moimImageFile = formData.get('moim_image') as File;
  const moimDataOrigin = JSON.parse(moimDataString as string);

  if (!moimDataOrigin) {
    return NextResponse.json({ message: '잘못된 페이로드 입니다' }, { status: 400 });
  }

  const { data: existingMoim, error: existingMoimError } = await supabase
    .from('moims')
    .select('*')
    .eq('id', id)
    .single();

  if (existingMoimError) {
    return NextResponse.json({ message: existingMoimError?.message }, { status: 500 });
  }

  if (!existingMoim) {
    return NextResponse.json({ message: '존재하지 않는 모임입니다' }, { status: 404 });
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
    id: existingMoim.id,
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
    online: moimDataOrigin.online,
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
    .update({ ...moimData })
    .eq('id', id)
    .select(
      '*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .single();

  if (updatedMoimError) {
    return NextResponse.json({ message: updatedMoimError?.message }, { status: 500 });
  }

  if (!updatedMoim) {
    return NextResponse.json({ message: '모임 수정 실패' }, { status: 500 });
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
    return NextResponse.json({ message: moimError?.message }, { status: 500 });
  }

  return NextResponse.json({ message: '모임 삭제 성공' }, { status: 200 });
}
