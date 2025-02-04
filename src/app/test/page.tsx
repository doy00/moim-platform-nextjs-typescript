'use client';

import { useAuth } from '@/hooks/auth/auth.hook';

export default function TestPage() {
  const { me, isMeLoading, signOut } = useAuth();

  return (
    <div>
      <button onClick={signOut}>로그아웃</button>
      <div>
        <p>{me?.email}</p>
      </div>
    </div>
  );
}
