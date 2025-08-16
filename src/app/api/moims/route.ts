import { MOIMS_ITEMS_PER_PAGE } from '@/constants/common/common.const';
// import { TMoimClient, TMoims, TMoimsJoined } from '@/types/supabase/supabase-custom.type';
// import convertToWebP from '@/utils/common/converToWebp';
// import { mapMoimsToClient } from '@/utils/common/mapMoims';
// import { createClient } from '@/utils/supabase/server';
// import { PostgrestError } from '@supabase/supabase-js';
// import { cookies } from 'next/headers';
import { mockApi } from '@/apis/mockApi';
import { NextRequest, NextResponse } from 'next/server';
// import { getUser } from '../auth/getUser';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageQuery = searchParams.get('page');
  
  // 목업 데이터 사용
  try {
    const result = await mockApi.getMoims();
    const page = Math.max(1, Number(pageQuery) || 1);
    const totalPages = Math.ceil(result.totalCount / MOIMS_ITEMS_PER_PAGE);

    return NextResponse.json(
      {
        data: result.data,
        pagination: {
          totalItems: result.totalCount,
          totalPages,
          currentPage: page,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: '목업 데이터 로드 실패' }, { status: 500 });
  }

  /* 기존 Supabase 코드 (주석처리)
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { count: totalItems, error: countError } = await supabase
    .from('moims')
    .select('id', { count: 'exact', head: true });

  if (countError) {
    console.error(countError);
    return NextResponse.json({ message: countError?.message }, { status: 500 });
  }

  if (!totalItems) {
    return NextResponse.json({ message: '아이템이 하나도 없어요' }, { status: 404 });
  }

  const page = Math.max(1, Number(pageQuery) || 1); // 최소 1 보장
  const start = (page - 1) * MOIMS_ITEMS_PER_PAGE;
  const end = start + MOIMS_ITEMS_PER_PAGE - 1;

  const {
    data: moims,
    error: moimError,
  }: {
    data: TMoimsJoined[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from('moims')
    .select(
      '*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .order('created_at', { ascending: false })
    .range(start, end);

  if (moimError) {
    console.error(moimError);
    return NextResponse.json({ message: moimError?.message }, { status: 500 });
  }

  if (!moims) {
    return NextResponse.json({ message: '모임이 하나도 없어요' }, { status: 404 });
  }

  const totalPages = Math.ceil(totalItems / MOIMS_ITEMS_PER_PAGE);

  const moimsToClient: TMoimClient[] = mapMoimsToClient(moims);

  return NextResponse.json(
    {
      data: moimsToClient,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
      },
    },
    { status: 200 },
  );
  */
}

// 모임 생성
export async function POST(req: NextRequest) {
  // 목업 데이터 사용
  try {
    const formData = await req.formData();
    const moimDataString = formData.get('moim_json');
    
    if (!moimDataString) {
      return NextResponse.json({ message: 'formData에 moim_json이 없습니다' }, { status: 400 });
    }

    const moimDataOrigin = JSON.parse(moimDataString as string);
    const newMoim = await mockApi.createMoim(moimDataOrigin);
    
    return NextResponse.json(newMoim, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '모임 생성 실패' }, { status: 500 });
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

  const formData = await req.formData();
  const moimDataString = formData.get('moim_json'); // 클라이언트에서 json으로 묶어줘야 함

  if (!moimDataString) {
    return NextResponse.json({ message: 'formData에 moim_json이 없습니다' }, { status: 400 });
  }

  const moimImageFile = formData.get('moim_image') as File;
  const moimDataOrigin = JSON.parse(moimDataString as string);

  if (!moimDataOrigin) {
    return NextResponse.json({ message: '잘못된 페이로드 입니다' }, { status: 400 });
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
    master_email: foundUser.email,
    images: null,
    online: moimDataOrigin.online,
  };

  // 이미지 파일이 있는 경우
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

  // 이미지 파일이 없어도 'moims' 테이블에 모임 데이터를 삽입
  const {
    data: moim,
    error: moimError,
  }: { data: TMoimsJoined | null; error: PostgrestError | null } = await supabase
    .from('moims')
    .upsert({ ...moimData })
    .select(
      '*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .single();

  if (moimError) {
    return NextResponse.json({ message: moimError?.message }, { status: 500 });
  }

  if (!moim) {
    return NextResponse.json({ message: '모임 생성 실패' }, { status: 500 });
  }

  // participated_moims 테이블에 모임 생성자 추가
  const { error: participatedError } = await supabase.from('participated_moims').insert({
    moim_uuid: moim.id,
    user_uuid: foundUser.id,
    user_email: foundUser.email,
    user_image: foundUser.image,
    user_nickname: foundUser.nickname,
  });

  if (participatedError) {
    return NextResponse.json({ message: participatedError?.message }, { status: 500 });
  }

  const moimsToClient: TMoimClient[] = mapMoimsToClient([moim]);
  return NextResponse.json(moimsToClient[0], { status: 200 });
  */
}
