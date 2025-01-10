'use client';

import { SignInForm } from '@/components/auth';
import AuthQuestions from '@/components/auth/AuthQuestions';
import AuthSelectEmailKakao from '@/components/auth/AuthSelectEmailKakao';
import { useSearchParams } from 'next/navigation';

export default function SignInContainer() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  return (
    <section className="w-full h-auto min-h-dvh flex flex-col items-center justify-center bg-background200 text-gray800">
      {type === null ? (
        <AuthSelectEmailKakao>
          <AuthQuestions type="signin" />
        </AuthSelectEmailKakao>
      ) : null}
      {type === 'email' ? <SignInForm /> : null}
    </section>
  );
}
