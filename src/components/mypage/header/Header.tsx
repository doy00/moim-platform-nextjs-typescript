'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderAnimation } from '@/components/mypage/LoadingAnimation';
import { PiSignOutBold } from 'react-icons/pi';
import { useAuth } from '@/hooks/auth/auth.hook';
import { useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <div className="flex justify-between items-center px-5 py-4 gap-2.5 2xl:hidden">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src="/images/mypage/logo.svg" alt="logo" width={120} height={30} />
        </Link>
        <HeaderAnimation />
      </div>

      {/* 로그아웃 버튼 */}
      {pathname === '/mypage' && (
        <button
          onClick={handleSignOut}
          className="rounded-full bg-orange200 w-6 h-6 flex items-center justify-center"
        >
          <PiSignOutBold size={14} className="text-background200" />
        </button>
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
