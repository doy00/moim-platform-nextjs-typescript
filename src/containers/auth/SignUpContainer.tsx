'use client';

import { SignUpForm } from '@/components/auth';
import Link from 'next/link';

export default function SignUpContainer() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 pb-6">
        <h1 className="text-title-1 font-bold">회원가입</h1>
      </div>
      <SignUpForm />
      <p className="text-sm text-gray-500">
        이미 회원이신가요? <Link href="/signin">로그인</Link>
      </p>
    </div>
  );
}
