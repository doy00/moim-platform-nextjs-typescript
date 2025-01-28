import { TMe, TPutMeInputs } from '@/types/auth/auth.type';
import convertToWebP from '@/utils/common/converToWebp';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

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

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const meDataString = formData.get('me_json');
  const meImageFile = formData.get('me_image') as File;
  const meDataOrigin = JSON.parse(meDataString as string);

  if (!meDataOrigin) {
    return NextResponse.json({ message: '잘못된 페이로드 입니다' }, { status: 400 });
  }

  const { nickname, position, introduction, tags }: TPutMeInputs = meDataOrigin;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
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

  const newUserData: Partial<TMe> = {
    email: userData.email,
    nickname,
    position,
    introduction,
    tags,
  };

  if (meImageFile) {
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
    newUserData.image = imageUrlData.publicUrl;
  }

  const {
    data: updatedUser,
    error: updatedUserError,
  }: { data: TMe | null; error: PostgrestError | null } = await supabase
    .from('users')
    .update({ ...newUserData })
    .eq('email', newUserData.email)
    .select('*')
    .single();

  if (updatedUserError) {
    return NextResponse.json({ message: updatedUserError?.message }, { status: 401 });
  }

  return NextResponse.json(updatedUser, { status: 200 });
}
