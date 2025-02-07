'use client';

import { useAuth } from '@/hooks/auth/auth.hook';
import { useState } from 'react';

export default function TestPage() {
  const [image, setImage] = useState<File | null>(null);
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

  const handleUpdateImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('me_image', image);
    const response = await fetch(`/api/auth/me/${me?.id}/image`, {
      method: 'PUT',
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };

  // useEffect(() => {
  //   throw new Error('test');
  // }, []);

  return (
    <div>
      <button onClick={signOut}>로그아웃</button>
      <div>
        <p>{me?.email}</p>
      </div>
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      </div>
      <div className="flex gap-2">
        <button onClick={handleTest}>리뷰작성테스트</button>
        <button onClick={handleUpdateImage}>플필사진만업데이트테스트</button>
      </div>
      <div>{me?.image && <img src={me?.image} alt="프로필 사진" />}</div>
      <div>
        <button
          onClick={() => {
            fetch('/api/auth/send-recovery-email', {
              method: 'POST',
              body: JSON.stringify({ email: me?.email }),
            });
          }}
        >
          보내기
        </button>
      </div>
    </div>
  );
}
