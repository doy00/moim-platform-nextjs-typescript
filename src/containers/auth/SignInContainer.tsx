'use client';

import { SignInForm } from '@/components/auth';
import AuthQuestions from '@/components/auth/AuthQuestions';
import SelectAuth from '@/components/auth/SelectAuth';
import { useSearchParams } from 'next/navigation';

export default function SignInContainer() {
  const searchParams = useSearchParams();

  const type = searchParams.get('type');

  return (
    <section className="w-full h-auto min-h-dvh flex flex-col items-center justify-center bg-white">
      {type === null ? (
        <SelectAuth>
          <AuthQuestions type="signin" />
        </SelectAuth>
      ) : null}
      {type === 'email' ? <SignInForm /> : null}
    </section>
  );
}
