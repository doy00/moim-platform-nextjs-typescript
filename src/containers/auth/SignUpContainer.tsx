'use client';

import { SignUpForm } from '@/components/auth';

export default function SignUpContainer() {
  return (
    <div className="w-full h-auto min-h-dvh flex flex-col items-center justify-center bg-white">
      <SignUpForm />
    </div>
  );
}
