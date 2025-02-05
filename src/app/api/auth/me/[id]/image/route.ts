import { TMe } from '@/types/auth/auth.type';
import convertToWebP from '@/utils/common/converToWebp';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const formData = await req.formData();
  const meImageFile = formData.get('me_image') as File;

  const { data: user, error: userError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase.from('users').select('*').eq('id', id).single();

  if (userError) {
    return NextResponse.json({ message: userError?.message }, { status: 401 });
  }

  if (!user) {
    return NextResponse.json({ message: '사용자 정보가 없어요' }, { status: 401 });
  }

  if (!meImageFile) {
    return NextResponse.json({ message: '이미지 파일이 없어요' }, { status: 401 });
  }

  const imageBuffer = await convertToWebP(meImageFile, 1080);
  const filePath = `users_${Date.now()}.webp`;

  if (!imageBuffer) {
    return NextResponse.json({ message: '이미지 변환 중 오류 발생' }, { status: 500 });
  }

  const { data: imageData, error: imageError } = await supabase.storage
    .from('users')
    .upload(filePath, imageBuffer, {
      contentType: 'image/webp',
    });

  if (imageError) {
    return NextResponse.json({ message: '이미지 업로드 중 오류 발생' }, { status: 500 });
  }

  const { data: imageUrlData } = supabase.storage.from('moims').getPublicUrl(filePath);
  user.image = imageUrlData.publicUrl;

  const {
    data: updatedUser,
    error: updatedUserError,
  }: { data: TMe | null; error: PostgrestError | null } = await supabase
    .from('users')
    .update({ image: user.image })
    .eq('id', id)
    .select()
    .single();

  if (updatedUserError) {
    return NextResponse.json({ message: updatedUserError?.message }, { status: 401 });
  }

  if (!updatedUser) {
    return NextResponse.json({ message: '프로필 이미지 변경 실패' }, { status: 401 });
  }

  return NextResponse.json(
    { message: '프로필 이미지 변경 성공', data: updatedUser },
    { status: 200 },
  );
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: user, error: userError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase.from('users').update({ image: null }).eq('id', id).select().single();

  if (userError) {
    return NextResponse.json({ message: userError?.message }, { status: 401 });
  }

  return NextResponse.json({ message: '프로필 이미지 삭제 성공', data: user }, { status: 200 });
}
