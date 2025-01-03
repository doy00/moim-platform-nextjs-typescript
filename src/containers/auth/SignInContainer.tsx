'use client';

import { SignInForm } from '@/components/auth';
import Link from 'next/link';

export default function SignInContainer() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 pb-6">
        <h1 className="text-title-1 font-bold">로그인</h1>
      </div>
      <SignInForm />
      <p className="text-sm text-gray-500">
        두더밑이 처음이신가요? <Link href="/signup">회원가입</Link>
      </p>
    </div>
  );
}
