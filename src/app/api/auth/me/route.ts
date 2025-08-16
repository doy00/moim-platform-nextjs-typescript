// import { TMe, TPutMeInputs } from '@/types/auth/auth.type';
// import { deleteCookie } from '@/utils/auth/auth-server.util';
// import convertToWebP from '@/utils/common/converToWebp';
// import { createClient } from '@/utils/supabase/server';
// import { PostgrestError } from '@supabase/supabase-js';
// import { cookies } from 'next/headers';
import { mockApi } from '@/apis/mockApi';
import { NextRequest, NextResponse } from 'next/server';
// import { getUser } from '../getUser';

export async function GET() {
  // 목업 데이터 사용
  try {
    const user = await mockApi.getUser();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '사용자 정보 조회 실패' }, { status: 500 });
  }

  /* 기존 Supabase 코드 (주석처리)
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { isSuccess, message, user, status } = await getUser(supabase);

  if (!isSuccess) {
    return NextResponse.json({ message }, { status });
  }

  const { data: me, error: meError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase
      .from('users')
      .select('id, email, nickname, position, introduction, tags, image, is_social')
      .eq('email', user.email)
      .single();

  if (meError) {
    return NextResponse.json({ message: meError?.message }, { status: 401 });
  }

  if (!me) {
    return NextResponse.json({ message: '사용자 정보를 찾을 수 없습니다' }, { status: 404 });
  }

  return NextResponse.json(me, { status: 200 });
  */
}

export async function PUT(req: NextRequest) {
  // 목업 데이터 사용
  try {
    const formData = await req.formData();
    const meDataString = formData.get('me_json');

    if (!meDataString) {
      return NextResponse.json({ message: 'formData에 me_json이 없습니다' }, { status: 400 });
    }

    const meDataOrigin = JSON.parse(meDataString as string);
    const updatedUser = await mockApi.updateUser(meDataOrigin);
    
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '사용자 정보 업데이트 실패' }, { status: 500 });
  }

  /* 기존 Supabase 코드 (주석처리)
  const formData = await req.formData();
  const meDataString = formData.get('me_json');

  if (!meDataString) {
    return NextResponse.json({ message: 'formData에 me_json이 없습니다' }, { status: 400 });
  }

  const meImageFile = formData.get('me_image') as File;
  const meDataOrigin = JSON.parse(meDataString as string);

  if (!meDataOrigin) {
    return NextResponse.json({ message: '잘못된 페이로드 입니다' }, { status: 400 });
  }

  const { nickname, position, introduction, tags }: TPutMeInputs = meDataOrigin;

  let tagsArray: string[] | null = null;
  if (tags && tags.length > 0) {
    tagsArray = tags.filter((tag) => tag !== '');
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { isSuccess, message, user, status: userStatus } = await getUser(supabase);

  if (!isSuccess) {
    return NextResponse.json({ message }, { status: userStatus });
  }

  const { data: userData, error: userError }: { data: TMe | null; error: PostgrestError | null } =
    await supabase
      .from('users')
      .select('id, email, nickname, position, introduction, tags, image, is_social')
      .eq('email', user.email)
      .single();

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
    tags: tagsArray,
    is_social: userData.is_social,
  };

  if (meImageFile) {
    const imageBuffer = await convertToWebP(meImageFile, 1080);
    const filePath = `users/${user.email}/${Date.now()}.webp`;

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

    const { data: imageUrlData } = supabase.storage.from('users').getPublicUrl(filePath);
    newUserData.image = imageUrlData.publicUrl;
  }

  const {
    data: updatedUser,
    error: updatedUserError,
  }: { data: TMe | null; error: PostgrestError | null } = await supabase
    .from('users')
    .update({ ...newUserData, updated_at: new Date().toISOString() })
    .eq('email', newUserData.email)
    .select('id, email, nickname, position, introduction, tags, image, is_social')
    .single();

  if (updatedUserError) {
    return NextResponse.json({ message: updatedUserError?.message }, { status: 500 });
  }

  return NextResponse.json(updatedUser, { status: 200 });
  */
}
