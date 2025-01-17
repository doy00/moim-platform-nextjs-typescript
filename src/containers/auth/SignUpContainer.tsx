'use client';

import { SignUpForm } from '@/components/auth';

export default function SignUpContainer() {
  return (
    <div className="fixed top-0 left-0 w-full h-full min-w-dvw min-h-dvh overflow-y-auto">
      <section className="w-full md:min-w-[744px] h-auto min-h-dvh flex flex-col items-center justify-center bg-background200 text-gray800">
        <SignUpForm />
      </section>
    </div>
  );
}
