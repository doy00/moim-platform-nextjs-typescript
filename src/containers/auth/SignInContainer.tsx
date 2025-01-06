'use client';

import { SignInForm } from '@/components/auth';
import SelectAuth from '@/components/auth/SelectAuth';
import { useAuthType } from '@/hooks/auth.hook';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInContainer() {
  const { authType, handleAuthType } = useAuthType();

  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get('type');

  const handleClickLogin = () => {
    handleAuthType('email');
    router.push('/signin?type=email');
  };

  return (
    <section className="w-full h-auto min-h-dvh flex flex-col items-center justify-center bg-white">
      {!authType || type === null ? (
        <SelectAuth handleAuthType={handleAuthType}>
          <p className="text-sm text-gray500">
            이미 계정이 있으신가요?{' '}
            <button onClick={handleClickLogin} className="underline font-bold text-gray900">
              로그인하기
            </button>
          </p>
        </SelectAuth>
      ) : null}
      {authType === 'email' && type === 'email' ? <SignInForm /> : null}
    </section>
  );
}
