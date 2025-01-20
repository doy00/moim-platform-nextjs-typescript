// 임시
// /hooks/detail/useCheckAuth.ts
'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const getLocalStorageItem = (keyName: string) => {
  return window.localStorage.getItem(keyName);
};

export const setLocalStorageItem = (keyName: string, keyValue: string) => {
  window.localStorage.setItem(keyName, keyValue);
};

export const removeLocalStorageItem = (keyName: string) => {
  window.localStorage.removeItem(keyName);
};

export const useCheckAuth = () => {
  const router = useRouter();

  const checkAuthAndExecute = useCallback((callback: () => void) => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return;

    const token = getLocalStorageItem('dothemeet-token');
    
    if (!token) {
      // 현재 URL을 state로 전달하여 로그인 후 돌아올 수 있도록 함
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`/auth/signin?returnUrl=${returnUrl}`);
      return;
    }

    callback();
  }, [router]);

  return { checkAuthAndExecute };
};