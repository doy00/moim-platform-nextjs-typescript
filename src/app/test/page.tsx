'use client';

import { useAuth } from '@/hooks/auth/auth.hook';

export default function TestPage() {
  const { me, isMeLoading, signOut } = useAuth();

  const handleTest = async () => {
    const response = await fetch(`/api/moims/cb2cf966-02e3-4d71-bfb2-e14c60dbb85a/review`, {
      method: 'POST',
      body: JSON.stringify({
        review: '테스트 리뷰',
        rate: 'SOSO',
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={signOut}>로그아웃</button>
      <div>
        <p>{me?.email}</p>
      </div>
      <div>
        <button onClick={handleTest}>리뷰작성테스트</button>
      </div>
    </div>
  );
}
