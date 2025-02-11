'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderAnimation } from '@/components/mypage/LoadingAnimation';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center px-5 py-4 gap-2.5">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src="/images/mypage/logo.svg" alt="logo" width={120} height={30} />
        </Link>
        <HeaderAnimation />
      </div>

      {pathname === '/mypage' && (
        <Link href="/mypage/editUser">
          <Image src="/images/mypage/edit.svg" alt="edit" width={24} height={24} />
        </Link>
      )}

      {pathname === '/mypage/editUser' && (
        <Link href="/mypage">
          <Image src="/images/mypage/close.svg" alt="close" width={24} height={24} />
        </Link>
      )}

      {pathname === '/mypage/editPassword' && (
        <Link href="/mypage/editUser">
          <Image src="/images/mypage/close.svg" alt="close" width={24} height={24} />
        </Link>
      )}
    </div>
  );
}
