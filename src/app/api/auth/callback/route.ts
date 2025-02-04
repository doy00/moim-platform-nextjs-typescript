import { TMe } from '@/types/auth/auth.type';
import { setCookie } from '@/utils/auth/auth-server.util';
import { createServerClient } from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

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

    // console.log('user data when callback ====>', data);

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', data.user?.email)
      .single();

    if (data.user && !existingUser) {
      const {
        data: userData,
        error: userError,
      }: { data: TMe | null; error: PostgrestError | null } = await supabase
        .from('users')
        .upsert({
          email: data.user.email,
          nickname: data.user.user_metadata.full_name,
          position: null,
          introduction: null,
          tags: null,
          image: data.user.user_metadata.avatar_url,
        })
        .select()
        .single();

      if (userError) {
        // console.log('userError when callback ====>', userError);
        return NextResponse.json({ message: '회원가입에 실패했습니다' }, { status: 404 });
      }

      // console.log('userData when callback ====>', userData);

      if (!userData) {
        return NextResponse.json({ message: '회원가입에 실패했습니다' }, { status: 404 });
      }
    }

    if (!error) {
      setCookie({
        name: 'access_token',
        value: data.session?.access_token,
        maxAge: 60 * 60,
      });
      setCookie({
        name: 'refresh_token',
        value: data.session?.refresh_token,
        maxAge: 60 * 60 * 24 * 30,
      });

      // console.log('data when not error ===========>', data);
      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const tokenParams = `token=${data.session?.access_token}&refresh_token=${data.session?.refresh_token}`;
      if (isLocalEnv) {
        if (next) return NextResponse.redirect(`${origin}/auth/temp?next=${next}&${tokenParams}`);
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}/auth/temp?${tokenParams}`);
      } else if (forwardedHost) {
        if (next)
          return NextResponse.redirect(
            `https://${forwardedHost}/auth/temp?next=${next}&${tokenParams}`,
          );
        return NextResponse.redirect(`https://${forwardedHost}/auth/temp?${tokenParams}`);
      } else {
        return NextResponse.redirect(`${origin}/auth/temp?${tokenParams}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}`);
}
