import { TMoims, TParticipatedMoims, TReviews } from '@/types/supabase/supabase-custom.type';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const MOIMS_ITEMS_PER_PAGE = 8;

type TMoimsJoined = TMoims & {
  reviews: TReviews[];
  participated_moims: TParticipatedMoims[];
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageQuery = searchParams.get('page');
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 총 아이템 수를 가져옵니다.
  const { count: totalItems, error: countError } = await supabase
    .from('moims')
    .select('id', { count: 'exact', head: true });

  if (countError) {
    console.error(countError);
    return NextResponse.json({ error: countError?.message }, { status: 401 });
  }

  if (!totalItems) {
    return NextResponse.json({ error: '아이템이 하나도 없어요' }, { status: 404 });
  }

  if (pageQuery !== 'null') {
    const page = Number(pageQuery);
    const start = page === 1 || page === 0 ? 0 : (page - 1) * MOIMS_ITEMS_PER_PAGE;
    const end = start + MOIMS_ITEMS_PER_PAGE - 1;

    const {
      data: moims,
      error: moimError,
    }: {
      data: TMoimsJoined[] | null;
      error: PostgrestError | null;
    } = await supabase
      .from('moims')
      .select('*, reviews (*), participated_moims (*)')
      .order('created_at', { ascending: false })
      .range(start, end);

    if (moimError) {
      console.error(moimError);
      return NextResponse.json({ error: moimError?.message }, { status: 401 });
    }

    if (!moims) {
      return NextResponse.json({ error: '모임이 하나도 없어요' }, { status: 404 });
    }

    // 총 페이지 수를 계산합니다.
    const totalPages = Math.ceil(totalItems / MOIMS_ITEMS_PER_PAGE);

    return NextResponse.json(
      {
        data: moims,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page, // 1부터 시작하는 페이지 번호
        },
      },
      { status: 200 },
    );
  }

  // 페이지 파라미터가 없는 경우 전체 데이터를 가져옵니다.
  const {
    data: moims,
    error: moimError,
  }: {
    data: TMoimsJoined[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from('moims')
    .select('*, reviews (*), participated_moims (*)')
    .order('created_at', { ascending: false });

  if (moimError) {
    console.error(moimError);
    return NextResponse.json({ error: moimError?.message }, { status: 401 });
  }
  if (!moims) {
    return NextResponse.json({ error: '모임이 하나도 없어요' }, { status: 404 });
  }

  // 총 페이지 수를 계산합니다.
  const totalPages = Math.ceil(totalItems / MOIMS_ITEMS_PER_PAGE);

  return NextResponse.json(
    {
      data: moims,
      pagination: {
        totalItems,
        totalPages,
        currentPage: 1, // 페이지 파라미터가 없으므로 첫 번째 페이지로 간주
      },
    },
    { status: 200 },
  );
}
