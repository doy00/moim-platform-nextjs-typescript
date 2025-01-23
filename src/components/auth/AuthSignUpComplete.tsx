'use client';

import { useSignInMutation } from '@/hooks/auth/auth.hook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AuthButton from './AuthButton';
import DothemeetCharacter from './DothemeetCharacter';
import DothemeetLogo from './DothemeetLogo';

interface AuthSignUpCompleteProps {
  data: {
    state: boolean;
    nickname: string;
    email: string;
    password: string;
  };
}

function AuthSignUpComplete({ data }: AuthSignUpCompleteProps) {
  const router = useRouter();
  const { mutateAsync: signIn, error: signInError } = useSignInMutation();

  const handleSignIn = async () => {
    await signIn({ email: data.email, password: data.password });
    router.push('/');
  };

  useEffect(() => {
    if (signInError) {
      router.push('/auth/sign-up');
    }
  }, [signInError, router]);

  return (
    <div className="w-[327px] md:w-[584px] 2xl:w-[1536px] min-h-dvh flex flex-col items-center justify-center">
      <div className="hidden md:flex w-full h-14 items-center">
        <DothemeetLogo />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <DothemeetCharacter isFull={false} />
        <div className="w-full h-full flex flex-col justify-center items-center pt-5">
          <p className="text-orange200 text-body-1-reading font-bold">가입완료</p>
          <p className="text-gray800 text-heading-2 font-medium">{data.nickname}님 환영해요</p>
        </div>
      </div>
      <div className="w-full 2xl:w-[584px] flex flex-col items-center justify-center gap-4 pb-12 2xl:pb-[100px]">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <AuthButton className="w-full text-gray50 bg-orange200" onClick={handleSignIn}>
            확인
          </AuthButton>
        </div>
      </div>
    </div>
  );
}

export default AuthSignUpComplete;
