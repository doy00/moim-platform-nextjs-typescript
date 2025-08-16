// import { createBrowserClient } from '@supabase/ssr';

// 목업 클라이언트 - Supabase 환경변수 제거
export const createClient = () => {
  return {
    // 목업 메서드들
    from: () => ({
      select: () => ({ data: null, error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null })
    }),
    auth: {
      getUser: () => ({ data: { user: null }, error: null }),
      signIn: () => ({ data: null, error: null }),
      signOut: () => ({ error: null })
    }
  };
};

/* 기존 Supabase 코드 (주석처리)
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
*/
