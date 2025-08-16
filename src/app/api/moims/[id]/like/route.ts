// import { getUser } from '@/app/api/auth/getUser';
// import { mapMoimsToClient } from '@/utils/common/mapMoims';
// import { createClient } from '@/utils/supabase/server';
// import { cookies } from 'next/headers';
import { mockApi } from '@/apis/mockApi';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  // 목업 데이터 사용
  try {
    const result = await mockApi.likeMoim(id);
    const moimDetail = await mockApi.getMoimDetail(id);
    
    return NextResponse.json({
      message: '모임 찜하기가 성공적으로 완료되었습니다',
      data: moimDetail.moim
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || '찜하기 실패' }, { status: 500 });
  }

  /* 기존 Supabase 코드 (주석처리)
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { isSuccess, message, user, status } = await getUser(supabase);

  if (!isSuccess) {
    return NextResponse.json({ message }, { status });
  }

  const { data: foundUser, error: foundUserError } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (foundUserError) {
    return NextResponse.json({ message: foundUserError?.message }, { status: 401 });
  }

  if (!foundUser) {
    return NextResponse.json({ message: '사용자 정보가 없어요' }, { status: 404 });
  }

  const { data: existingLike } = await supabase
    .from('liked_moims')
    .select('*')
    .eq('moim_uuid', id)
    .eq('user_uuid', foundUser.id)
    .single();

  if (existingLike) {
    return NextResponse.json({ message: '이미 찜한 모임이에요' }, { status: 400 });
  }

  const { data: likeData, error: likeError } = await supabase
    .from('liked_moims')
    .upsert({ moim_uuid: id, user_uuid: foundUser.id })
    .select();

  if (likeError) {
    return NextResponse.json({ message: likeError?.message }, { status: 500 });
  }

  if (!likeData) {
    return NextResponse.json({ message: '모임 찜하기 실패' }, { status: 500 });
  }

  const { data: moim, error: moimError } = await supabase
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
    return NextResponse.json({ message: '모임 정보가 없어요' }, { status: 404 });
  }

  const response = {
    message: '모임 찜하기가 성공적으로 완료되었습니다',
    data: mapMoimsToClient([moim])[0],
  };

  return NextResponse.json(response, { status: 200 });
  */
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  // 목업 데이터 사용
  try {
    const result = await mockApi.unlikeMoim(id);
    const moimDetail = await mockApi.getMoimDetail(id);
    
    return NextResponse.json({
      message: '모임 찜 해제가 성공적으로 완료되었습니다',
      data: moimDetail.moim
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || '찜 해제 실패' }, { status: 500 });
  }

  /* 기존 Supabase 코드 (주석처리)
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { isSuccess, message, user, status: userStatus } = await getUser(supabase);

  if (!isSuccess) {
    return NextResponse.json({ message }, { status: userStatus });
  }

  const { data: foundUser, error: foundUserError } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (foundUserError) {
    return NextResponse.json({ message: foundUserError?.message }, { status: 401 });
  }

  if (!foundUser) {
    return NextResponse.json({ message: '사용자 정보가 없어요' }, { status: 404 });
  }

  const { data: deletedLike, error: deletedLikeError } = await supabase
    .from('liked_moims')
    .delete()
    .eq('moim_uuid', id)
    .eq('user_uuid', foundUser.id)
    .select()
    .single();

  if (deletedLikeError) {
    return NextResponse.json({ message: deletedLikeError?.message }, { status: 500 });
  }

  if (!deletedLike) {
    return NextResponse.json({ message: '찜한 모임이 없어요' }, { status: 404 });
  }

  const { data: moim, error: moimError } = await supabase
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
    return NextResponse.json({ message: '모임 정보가 없어요' }, { status: 404 });
  }

  const response = {
    message: '모임 찜 해제가 성공적으로 완료되었습니다',
    data: mapMoimsToClient([moim])[0],
  };

  return NextResponse.json(response, { status: 200 });
  */
}
