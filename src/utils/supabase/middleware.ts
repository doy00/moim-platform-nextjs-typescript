import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const cookieStore = await cookies();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('user in middlware ====>', user);
  console.log('cookieStore in middlware ====>', cookieStore.getAll());
  // 로그인이 안되었을 때, /, /api, /detail, /auth 를 제외하고는 모두 로그인 페이지로 리다이렉트 한다.
  // /favorite, /make, /mypage 는 로그인이 필요하므로 리다이렉트 한다

  // path 가 mypage 인 경우 콘솔
  // 그리고 쿠키도 찍어볼 것
  // 쿠키 보안단계를 낮춰볼 것
  if (
    !user &&
    request.nextUrl.pathname !== '/' &&
    !request.nextUrl.pathname.startsWith('/api') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    !request.nextUrl.pathname.startsWith('/detail')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};
