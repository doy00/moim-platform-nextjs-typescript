import { QUERY_KEY_ME } from '@/constants/auth/auth.const';
import { TMe } from '@/types/auth/auth.type';
import { setCookie } from '@/utils/auth/auth-server.util';
import { createServerClient } from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // console.log("callback 에서 받은 request =>", request);
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';
  const queryClient = new QueryClient();

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {}
          },
        },
      },
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log('user data when callback ====>', data);

    if (data.user) {
      const {
        data: userData,
        error: userError,
      }: { data: TMe | null; error: PostgrestError | null } = await supabase
        .from('users')
        .upsert({
          email: data.user.email,
          nickname: data.user.email, // 임시로 이메일로 닉네임 설정
          position: null,
          introduction: null,
          tags: null,
          image: data.user.user_metadata.avatar_url,
        })
        .select()
        .single();

      if (userError) {
        return NextResponse.json({ message: '회원가입에 실패했습니다' }, { status: 404 });
      }

      if (!userData) {
        return NextResponse.json({ message: '회원가입에 실패했습니다' }, { status: 404 });
      }

      setCookie({
        name: 'access_token',
        value: data.session?.access_token,
        maxAge: 60 * 60,
      });

      queryClient.setQueryData([QUERY_KEY_ME], userData);
    }

    if (!error) {
      // console.log('data ===========>', data);
      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        if (next) return NextResponse.redirect(`${origin}${next}`);
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}/`);
      } else if (forwardedHost) {
        if (next) return NextResponse.redirect(`https://${forwardedHost}${next}`);
        return NextResponse.redirect(`https://${forwardedHost}/`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}`);
}
