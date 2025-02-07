'use server';

import { deleteCookie, setCookie } from '@/utils/auth/auth-server.util';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { cookies, headers } from 'next/headers';

type GetUserResponse =
  | {
      isSuccess: true;
      message: string;
      user: User;
      status: 200;
    }
  | {
      isSuccess: false;
      message: string;
      user: null;
      status: number;
    };

export async function getUser(supabase: SupabaseClient): Promise<GetUserResponse> {
  const cookieStore = await cookies();
  const authorization = (await headers()).get('authorization');

  if (!authorization) {
    return {
      isSuccess: false,
      message: 'Authorization header가 없습니다',
      user: null,
      status: 401,
    };
  }

  const token = authorization?.split(' ')[1] ?? null;
  const refreshToken = cookieStore.get('refresh_token')?.value ?? null;

  if (!refreshToken) {
    return {
      isSuccess: false,
      message: 'Refresh token이 없습니다',
      user: null,
      status: 401,
    };
  }

  // 1. 우선 jwt 토큰 없이 유저 정보 조회 시도
  let {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // console.log('error ===>', error);

  if (error && error.message === 'Unauthorized') {
    return {
      isSuccess: false,
      message: '인증되지 않은 사용자입니다',
      user: null,
      status: 401,
    };
  }

  // 2. 토큰 없이 시도했는데, 세션이 유효하지 않은 경우
  if (error && error.message === 'Auth session missing!') {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    deleteCookie('sb-kabbnwozubbpbafvlolf-auth-token-code-verifier');

    // 3. 토큰을 사용해서 다시 시도
    ({
      data: { user },
      error,
    } = await supabase.auth.getUser(token));
  }

  // 4. 토큰을 사용해서 시도했는데 토큰이 유효하지 않은 경우, 세션 갱신 시도
  if (error && error?.code === 'bad_jwt') {
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (refreshError) {
      return {
        isSuccess: false,
        message: refreshError?.message,
        user: null,
        status: 500,
      };
    }

    if (!refreshData?.session?.access_token || !refreshData?.session?.refresh_token) {
      return {
        isSuccess: false,
        message: 'Refresh token이 유효하지 않습니다',
        user: null,
        status: 401,
      };
    }

    const { data: userData, error: userError } = await supabase.auth.getUser(
      refreshData.session.access_token,
    );

    if (userError) {
      return {
        isSuccess: false,
        message: userError?.message,
        user: null,
        status: 500,
      };
    }

    if (!userData.user) {
      return {
        isSuccess: false,
        message: '로그인 후 이용해주세요',
        user: null,
        status: 401,
      };
    }

    // 5. 세션 갱신 성공 시 쿠키 설정 및 유저 정보 반환
    user = userData.user;

    setCookie({
      name: 'access_token',
      value: refreshData?.session?.access_token,
      maxAge: 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    setCookie({
      name: 'refresh_token',
      value: refreshData?.session?.refresh_token,
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return {
      isSuccess: true,
      message: 'Refresh token 갱신 성공',
      user,
      status: 200,
    };
  }

  if (error) {
    return {
      isSuccess: false,
      message: error?.message,
      user: null,
      status: 500,
    };
  }

  if (!user) {
    return {
      isSuccess: false,
      message: '로그인 후 이용해주세요',
      user: null,
      status: 401,
    };
  }

  // 마지막 return 문은 상단에서 error에 걸리지 않았을 때 === jwt 없이 getUser 성공했다는 뜻
  return {
    isSuccess: true,
    message: '사용자 정보 조회 성공',
    user,
    status: 200,
  };
}
