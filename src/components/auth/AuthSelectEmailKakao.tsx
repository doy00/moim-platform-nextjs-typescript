'use client';

import { useAuth } from '@/hooks/auth/auth.hook';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AuthKakao from './AuthKakao';
import AuthLoading from './AuthLoading';
import DothemeetCharacter from './DothemeetCharacter';
import DothemeetLogo from './DothemeetLogo';

interface AuthSelectEmailKakaoProps {
  children: React.ReactNode;
}

export default function AuthSelectEmailKakao({ children }: AuthSelectEmailKakaoProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { me, isMeLoading, isMutationPending } = useAuth();

  const handleLoginWithProvider = () => {
    router.push('/api/auth/provider?provider=kakao&next=/');
  };

  useEffect(() => {
    if (!me) return;
    router.push('/');
  }, [me, router]);

  return (
    <>
      {(isMeLoading || isMutationPending) && <AuthLoading />}
      <div className="w-[327px] md:w-[584px] 2xl:w-[1536px] min-h-dvh flex flex-col items-center justify-center">
        <div className="hidden md:flex w-full h-14 items-center">
          <DothemeetLogo />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <DothemeetCharacter isFull />
        </div>
        <div className="w-full 2xl:w-[584px] flex flex-col items-center justify-center gap-4 pb-12 2xl:pb-[100px]">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <button
              onClick={handleLoginWithProvider}
              className="w-full flex flex-row items-center justify-center h-[58px] bg-gray100 rounded-[20px] gap-3 font-medium"
            >
              <AuthKakao className="w-5 h-5" /> 카카오로 시작하기
            </button>
            <Link
              href="/auth/signup"
              className="w-full flex flex-row items-center justify-center h-[58px] bg-gray100 rounded-[20px] gap-3 font-medium"
            >
              이메일로 시작하기
            </Link>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
