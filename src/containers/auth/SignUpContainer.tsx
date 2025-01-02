'use client';

import { SignUpForm } from '@/components/auth';
import Link from 'next/link';

export default function SignUpContainer() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <SignUpForm />
      <p className="text-sm text-gray-500">
        이미 회원이신가요? <Link href="/signin">로그인</Link>
      </p>
    </div>
  );
}
